import { useCartStore } from "@/store/CartStore";
import { useAuthStore } from "@/store/AuthStore";
import { Outlet } from "react-router-dom";
import CartToast from "@/components/CartToast";
import WorkingHour from "@/components/WorkingHour";
import Navbar from "@/components/Navbar";

function Layout() {
  const authStore = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const totalQuantity = cartStore.getTotalQuantity();

  authStore.initlize();

  return (
    <>
      <Navbar />
      <WorkingHour />
      <div className="max-w-screen-2xl mx-auto xl:px-8">
        {totalQuantity > 0 ? <CartToast /> : null}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
