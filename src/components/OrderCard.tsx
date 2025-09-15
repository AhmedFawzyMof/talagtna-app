import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_BASE_URL } from "../config/config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../store/AuthStore";
import { Order, OrderProduct } from "@/config/types";

function useCancelOrder(token: string, refetch: () => void) {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE_URL}/order/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("فشل في إلغاء الطلب");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("تم إلغاء الطلب بنجاح");
      refetch();
    },
    onError: () => toast.error("فشل في إلغاء الطلب"),
  });
}

const METHODS = {
  cash_on_delivery: "نقدى",
  digital_wallet: "محفظة رقمية",
} as const;

function OrderCard({
  order,
  cities,
  refetch,
}: {
  order: Order;
  cities: any;
  refetch: () => void;
}) {
  const { token } = useAuthStore((state) => state);
  const discount = JSON.parse(order.discount);

  const [total, setTotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);

  useEffect(() => {
    let sum = 0;
    order.products.forEach((p) => {
      if (!p.with_coins) sum += p.price * p.quantity;
    });

    const city = cities.find((c: any) => c.city === order.city);
    const delivery = city?.value || 0;

    sum += delivery;
    sum -= discount.value;

    setTotal(sum);
    setDeliveryCost(delivery);
  }, [order, cities, discount.value]);

  const handleCancel = useCancelOrder(token, refetch).mutate;

  return (
    <div className="w-11/12 md:w-4/5 mx-auto mb-6 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* ✅ Order status */}
      <div className="flex flex-col items-center justify-center p-4">
        {order.processing === 1 && order.delivered === 0 && (
          <>
            <img
              src={`${IMAGE_BASE_URL}/img/processing.webp`}
              alt="الطلب قيد التجهيز"
              className="h-32 w-32 object-contain"
            />
            <p className="mt-2 text-primary font-bold">الطلب قيد التجهيز</p>
          </>
        )}

        {order.delivered === 0 && order.processing === 0 && (
          <button
            onClick={() => handleCancel(order.id)}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-white shadow hover:bg-primary/90 transition"
          >
            إلغاء الطلب
          </button>
        )}

        {order.delivered === 1 && (
          <>
            <img
              src={`${IMAGE_BASE_URL}/img/delivered.webp`}
              alt="تم التسليم"
              className="h-32 w-32 object-contain"
            />
            <p className="mt-2 text-primary font-bold">
              نشكركم على حسن ثقتكم بنا
            </p>
          </>
        )}
      </div>

      {/* ✅ Order details */}
      <dl className="divide-y divide-gray-100 text-sm">
        <InfoRow label="رقم الطلب">{order.id.substring(0, 8)}</InfoRow>
        <InfoRow label="تاريخ الطلب" valueClass="text-end" dir="ltr">
          {order.created_at}
        </InfoRow>
        <InfoRow label="طريقة الدفع">
          {METHODS[order.method as keyof typeof METHODS]}
        </InfoRow>

        {/* ✅ Products table */}
        <InfoRow label="منتجات الطلب">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="grid grid-cols-4 bg-gray-50 font-semibold text-gray-700">
                  <th>منتج</th>
                  <th>سعر</th>
                  <th>كمية</th>
                  <th>المجموع</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.products.map((p: OrderProduct) => (
                  <tr
                    key={p.id}
                    className="grid grid-cols-4 place-items-center text-center"
                  >
                    <td className="sm:hidden">
                      {p.name.length <= 20
                        ? p.name
                        : p.name.substring(0, 18) + "..."}
                    </td>
                    <td className="hidden sm:block">{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{!p.with_coins ? p.price * p.quantity : 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoRow>

        <InfoRow label="التوصيل">{deliveryCost} ج.م</InfoRow>
        <InfoRow label="إجمالي الطلب">{total} ج.م</InfoRow>

        {discount.code && <InfoRow label="قسيمة">{discount.code}</InfoRow>}

        <InfoRow label="الطلب قيد التجهيز">
          {order.processing === 1 ? "نعم" : "لا"}
        </InfoRow>
        <InfoRow label="تم تسليم الطلب">
          {order.delivered === 1 ? "نعم" : "لا"}
        </InfoRow>
      </dl>
    </div>
  );
}

// ✅ Reusable InfoRow component
function InfoRow({
  label,
  children,
  valueClass = "",
  dir,
}: {
  label: string;
  children: React.ReactNode;
  valueClass?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-50">
      <dt className="font-bold text-primary">{label}</dt>
      <dd
        className={`text-gray-700 sm:col-span-2 ${valueClass}`}
        dir={dir || "rtl"}
      >
        {children}
      </dd>
    </div>
  );
}

export default OrderCard;
