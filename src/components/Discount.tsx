import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/AuthStore";
import { BASE_URL } from "../config/config";
import { toast } from "sonner";
import { useCartStore } from "../store/CartStore";

export default function Discount() {
  const authStore = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);

  const DiscountMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch(`${BASE_URL}/discount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({ code: code }),
      });
      return response.json();
    },
    onSuccess(data) {
      if (!data.discount.success) {
        toast.error(data.discount.message);
        return;
      }

      toast.success("تم استخدام الكوبون بنجاح");
      const coupon = data.discount.coupon;
      cartStore.setDiscount(coupon.code, coupon.value);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = e.currentTarget.coupon.value;
    DiscountMutation.mutate(code);
  };

  if (!authStore.isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          لديك كوبون خصم
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="coupon"
            id="coupon"
            className="w-full rounded h-8 px-2 border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="كود الخصم ..."
          />

          <button className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <span>استخدام الكوبون</span>
          </button>
        </form>
      </div>
    </div>
  );
}
