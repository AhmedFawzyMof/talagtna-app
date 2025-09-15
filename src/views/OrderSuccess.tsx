import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { BASE_URL } from "../config/config";
import { useAuthStore } from "../store/AuthStore";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

function OrderSuccess() {
  const { order } = useParams<{ order: string }>();
  const url = new URL(window.location.href);
  const id = url.searchParams.get("invoice_id");
  const authStore = useAuthStore((state) => state);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  document.title = `Talagtna | رقم الطلب ${order}`;

  const {
    isLoading,
    error,
    data: initialResponse,
  } = useQuery({
    queryKey: [`order-success-${order}`],
    queryFn: () =>
      fetch(`${BASE_URL}/order/payment/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      }).then((res) => res.json()),

    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const { data: createOrderResponse, error: createOrderError } = useQuery({
    queryKey: ["create-order"],
    queryFn: () =>
      fetch(`${BASE_URL}/order/success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      }).then((res) => res.json()),

    enabled: initialResponse?.success === "success",
    retry: false,
  });

  useEffect(() => {
    if (createOrderError) {
      toast.error((createOrderError as Error).message);
    }

    if (createOrderResponse) {
      console.log(createOrderResponse);
      setSuccess(true);
    }
  }, [createOrderResponse, createOrderError, id, navigate]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[90vh] grid place-items-center">
      <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
        <div className="flex items-center sm:gap-8">
          <div
            className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-primary"
            aria-hidden="true"
          >
            {success ? (
              <i className="text-primary">✓</i>
            ) : (
              <i className="text-red-500">!</i>
            )}
          </div>

          <div>
            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              <a className="hover:underline">
                {success
                  ? `تم إنشاء الطلب بنجاح رقم الطلب هو ( ${id || order} )`
                  : "حدث خطأ ما أثناء إنشاء الطلب"}
              </a>
            </h3>
          </div>
        </div>
      </article>
    </div>
  );
}

export default OrderSuccess;
