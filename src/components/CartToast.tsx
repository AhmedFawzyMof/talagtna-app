import { useCartStore } from "../store/CartStore";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

export default function CartToast() {
  const cartStore = useCartStore((state) => state);
  const [showToast, setShowToast] = useState(false);
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (cartStore.getTotalQuantity() > 0) {
      setShowToast(true);
    }
  }, [cartStore.getTotalQuantity()]);

  useEffect(() => {
    if (pathname === "/cart" || pathname === "/order") {
      setShowToast(false);
    }
  }, [pathname]);

  return (
    showToast && (
      <div className="fixed bottom-10 right-4 z-50 bg-white p-3 shadow-lg rounded flex flex-col gap-3">
        <button
          className="absolute left-0 top-0 p-2"
          onClick={() => setShowToast(false)}
        >
          <MdCancel className="text-2xl text-primary-300" />
        </button>
        <p>عدد المنتجات في سلة التسوق: {cartStore.getTotalQuantity()}</p>
        <Link
          to="/cart"
          className="bg-primary font-bold p-2 rounded text-white"
        >
          انتقل إلى عربة التسوق لإكمال الطلب
        </Link>
      </div>
    )
  );
}
