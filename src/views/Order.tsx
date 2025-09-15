import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import { useNavigate } from "react-router-dom";
import OrderForm from "../components/OrderForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Order() {
  const cartStore = useCartStore((state) => state);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  // Handle delivery NaN (default to 0)
  const delivery = isNaN(cartStore.dilivery) ? 0 : cartStore.dilivery;
  const discountValue: number = cartStore.discount.value || 0;

  // Compute totals safely
  const total = subtotal + delivery;
  const totalDiscount = total - discountValue;

  document.title = "Talagtna | الطلب";

  useEffect(() => {
    if (cartStore.cart.length === 0) {
      navigate("/");
    }

    setSubtotal(
      cartStore.cart.reduce((acc, item) => {
        if (!item.with_coins) {
          return acc + item.price * item.quantity;
        }
        return acc;
      }, 0)
    );
  }, [cartStore.cart, cartStore.dilivery, navigate]);

  return (
    <>
      <section className="grid place-items-center py-7">
        <Card className="w-[95%] md:w-4/5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold text-primary">
              ملخص الطلب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm md:text-base text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <dt>المجموع الفرعي</dt>
                <dd id="subtotal">{subtotal} ج.م</dd>
              </div>

              <div className="flex justify-between border-b pb-2">
                <dt>التوصيل</dt>
                <dd>{delivery} ج.م</dd>
              </div>

              {discountValue > 0 && (
                <div className="flex justify-between border-b pb-2 text-green-600">
                  <dt>خصم</dt>
                  <dd id="discountValue">- {discountValue} ج.م</dd>
                </div>
              )}

              <div className="flex justify-between font-semibold text-lg text-primary">
                <dt>الإجمالي</dt>
                <dd id="total">
                  {isNaN(totalDiscount)
                    ? subtotal
                    : discountValue
                    ? totalDiscount
                    : total}{" "}
                  ج.م
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </section>

      <section className="grid place-items-center py-7">
        <OrderForm />
      </section>
    </>
  );
}
