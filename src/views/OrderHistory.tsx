import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import OrderCard from "../components/OrderCard";
import { BASE_URL } from "../config/config";
import { Loading } from "../components/Loading";
import { Order } from "../config/types";
import { Card, CardContent } from "@/components/ui/card";

function OrderHistory() {
  const authStore = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Talagtna | سجل الطلبات";
    if (!authStore.isAuthenticated) {
      toast.error("يجب عليك تسجيل الدخول");
      navigate("/");
    }
  }, [authStore.isAuthenticated, navigate]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order/history`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      if (!res.ok) throw new Error("فشل تحميل سجل الطلبات");
      return res.json();
    },
    enabled: authStore.isAuthenticated,
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="w-full h-screen grid place-items-center">
        <Card className="w-11/12 md:w-1/2 text-center">
          <CardContent className="py-10 text-red-600 font-semibold">
            حدث خطأ أثناء تحميل سجل الطلبات
          </CardContent>
        </Card>
      </div>
    );

  if (!data?.orders || data.orders.length === 0) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <Card className="w-11/12 md:w-2/3 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-10 gap-4">
            <i className="bx bxs-package text-primary text-[120px]" />
            <p className="text-lg font-medium text-gray-700">
              لا يوجد طلبات حتى الآن
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="w-full px-4 md:px-8 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          سجل الطلبات
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          استعرض جميع طلباتك السابقة وتابع حالتها
        </p>
      </header>

      <div className="w-full grid place-items-center">
        {data.orders.map((order: Order) => (
          <OrderCard
            key={order.id}
            order={order}
            cities={data.cities}
            refetch={refetch}
          />
        ))}
      </div>
    </main>
  );
}

export default OrderHistory;
