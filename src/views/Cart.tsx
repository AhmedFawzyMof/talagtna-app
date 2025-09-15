import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Discount from "../components/Discount";
import { IMAGE_BASE_URL } from "../config/config";

function Cart() {
  const cartStore = useCartStore((state) => state);
  const [subtotal, setSubtotal] = useState(0);
  const cart = cartStore.cart;
  const totalQuantity = cartStore.getTotalQuantity();
  const discount = cartStore.discount;

  document.title = "Talagtna | السلة";

  useEffect(() => {
    setSubtotal(
      cart.reduce((total, item) => {
        if (!item.with_coins) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0)
    );
  }, [cart, totalQuantity]);

  const total = subtotal - discount.value;
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      {cart.length > 0 && (
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            عربة التسوق
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            </div>
            <div className="flex flex-col mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              {subtotal > 0 && subtotal > 100 && <Discount />}
              <div>
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ملخص الطلب
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          السعر الأصلي
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {subtotal} ج
                        </dd>
                      </dl>

                      {discount.value !== 0 && (
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            التوفير
                          </dt>
                          <dd className="text-base font-medium text-green-600">
                            {discount.value} ج
                          </dd>
                        </dl>
                      )}
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        المجموع
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {total} ج
                      </dd>
                    </dl>
                  </div>

                  <Link
                    to="/order"
                    className="flex w-full items-center justify-center rounded-lg bg-primary/80 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary/30  "
                  >
                    الطلب
                  </Link>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      أو
                    </span>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary underline hover:no-underline dark:text-"
                    >
                      مواصلة التسوق <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <div className="w-full grid place-items-center">
          <div className="flex items-center justify-center flex-col gap-4 mt-12 w-64 py-4">
            <img
              className=""
              src={`${IMAGE_BASE_URL}/img/empty-cart.png`}
              alt="empty cart"
            />
            <Link
              to="/"
              className="flex items-center justify-center rounded-lg bg-primary/80 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              تسوق الان
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
