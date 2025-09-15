import { Link } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { IMAGE_BASE_URL } from "../config/config";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { CartProduct } from "@/config/types";

function CartItem({ product }: { product: CartProduct }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/product/${product.id}`} className="shrink-0 md:order-1">
          <img
            className="h-20 w-20"
            src={IMAGE_BASE_URL + product.image}
            alt={product.name}
          />
        </Link>

        <label htmlFor="counter-input" className="sr-only">
          اختر الكمية:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          {!product.with_coins && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => decrementQuantity(product.id)}
                id="decrement-button-4"
                data-input-counter-decrement="counter-input-4"
                className="inline-flex  h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/70 bg-white hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <FaMinus />
              </button>
              <p
                id="counter-input-4"
                className="w-10 shrink-0 border-0 bg-transparent text-center text-md font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              >
                {product.quantity}
              </p>
              <button
                type="button"
                onClick={() => incrementQuantity(product.id)}
                id="increment-button-4"
                data-input-counter-increment="counter-input-4"
                className="inline-flex  h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/70 bg-white hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <FaPlus />
              </button>
            </div>
          )}
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {product.price} {product.with_coins ? "نقطة" : "جنيه"}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {product.name}
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => removeFromCart(product.id)}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <FaRegTrashAlt /> &nbsp; حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
