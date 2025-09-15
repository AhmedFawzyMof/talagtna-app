import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { BASE_URL } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCartStore } from "../store/CartStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const METHODS = [
  { value: "cash_on_delivery", label: "نقدى" },
  { value: "payment", label: "عبر بطاقة الائتمان" },
] as const;

interface City {
  city: string;
  value: number;
}
interface UserData {
  name: string;
  phone: string;
  spare_phone: string;
  street: string;
  building: string;
  floor: string;
  city: string;
}

const useCities = (token: string) =>
  useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/city`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("فشل تحميل المدن");
      return response.json();
    },
  });

const useUserData = (token: string) =>
  useQuery<UserData>({
    queryKey: ["user_data"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("فشل تحميل بيانات المستخدم");
      const userdata = await response.json();
      return userdata.user;
    },
    enabled: !!token,
  });

function OrderForm() {
  const authStore = useAuthStore((s) => s);
  const cartStore = useCartStore((s) => s);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasCoins, setHasCoins] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: "",
    phone: "",
    spare_phone: "",
    street: "",
    building: "",
    floor: "",
    city: "",
  });
  const [orderForm, setOrderForm] = useState({ method: "cash_on_delivery" });

  const { data: cities } = useCities(authStore.token);
  const { data: userData, isLoading: userLoading } = useUserData(
    authStore.token
  );

  useEffect(() => {
    if (authStore.isAuthenticated && userData && !userLoading) {
      setFormData({ ...userData });
    }
  }, [authStore.isAuthenticated, userData, userLoading]);

  useEffect(() => {
    setHasCoins(cartStore.cart.some((p) => p.with_coins));
    cartStore.setDilivery(
      Number(cities?.find((c) => c.city === formData.city)?.value) || 0
    );
  }, [cities, formData.city, cartStore.cart]);

  const handleChange = (key: keyof UserData, value: string) =>
    setFormData({ ...formData, [key]: value });

  const saveUser = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("فشل حفظ البيانات");
      setLoading(false);
      return res.json();
    },

    onSuccess: (data) => {
      authStore.login(data.token, data.favorites);
      setStep(2);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ البيانات");
    },
  });

  const order = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({
          cart: cartStore.cart,
          method: orderForm.method,
          discount: cartStore.discount,
          dilivery: cartStore.dilivery,
        }),
      });
      if (!res.ok) throw new Error("فشل إنشاء الطلب");
      return res.json();
    },

    onSuccess: (data) => {
      cartStore.clearCart();
      cartStore.setDiscount("", 0);
      navigate(`/ordersuccess/${data.order}`);
      toast.success("تم إرسال الطلب بنجاح");
      setLoading(false);
    },
    onError: () => {
      toast.error("فشل في إنشاء الطلب");
      setLoading(false);
    },
  });

  const createPayment = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/order/create/paymentlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({
          ...formData,
          cart: cartStore.cart,
          discount: cartStore.discount,
          dilivery: cartStore.dilivery,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("فشل إنشاء رابط الدفع");
      return res.json();
    },

    onSuccess: (data) => {
      window.location.href = data.link;
    },
    onError: () => {
      toast.error("فشل في إنشاء رابط الدفع");
      setLoading(false);
    },
  });

  if (loading) return <Loading />;

  return (
    <Card className="w-[95%] md:w-4/5 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary font-bold text-center">
          {step === 1 ? "بيانات التوصيل" : "اختيار طريقة الدفع"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {step === 1 ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              saveUser.mutate();
            }}
          >
            <Input
              placeholder="الاسم"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
              <Input
                placeholder="رقم هاتف احتياطي"
                value={formData.spare_phone}
                onChange={(e) => handleChange("spare_phone", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="شارع"
                value={formData.street}
                onChange={(e) => handleChange("street", e.target.value)}
                required
              />
              <Input
                placeholder="عمارة"
                value={formData.building}
                onChange={(e) => handleChange("building", e.target.value)}
                required
              />
            </div>
            <Input
              placeholder="طابق"
              value={formData.floor}
              onChange={(e) => handleChange("floor", e.target.value)}
              required
            />

            <Label>المدن</Label>
            <Select
              value={formData.city}
              onValueChange={(val) => handleChange("city", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((c) => (
                  <SelectItem key={c.city} value={c.city}>
                    {c.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full mt-4">
              التالي
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <fieldset className="space-y-3">
              {METHODS.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-center justify-between border rounded p-3 cursor-pointer ${
                    orderForm.method === m.value
                      ? "border-primary bg-gray-50"
                      : "border-gray-300"
                  } ${
                    m.value === "payment" && hasCoins
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span>{m.label}</span>
                  <input
                    type="radio"
                    name="method"
                    value={m.value}
                    checked={orderForm.method === m.value}
                    disabled={m.value === "payment" && hasCoins}
                    onChange={() => setOrderForm({ method: m.value })}
                  />
                </label>
              ))}
            </fieldset>
            <Button
              onClick={() =>
                orderForm.method === "payment"
                  ? createPayment.mutate()
                  : order.mutate()
              }
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "جاري التحميل..."
                : orderForm.method === "payment"
                ? "استمر"
                : "تأكيد الطلب"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderForm;
