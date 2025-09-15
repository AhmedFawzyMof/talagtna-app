import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Coupon from "../components/Coupon";
import { BASE_URL } from "../config/config";
import { Loading } from "../components/Loading";

function Coupons() {
  document.title = `Talagtna | كوبونات`;

  const token = useAuthStore((state) => state.token);
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuth) {
    toast.error("يجب عليك تسجيل الدخول");
    navigate("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["coupons"],
    queryFn: () =>
      fetch(`${BASE_URL}/user/coupons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <Loading />;

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  if (data?.coupons.length == 0) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="bg-white w-11/12 md:w-5/6 shadow-md rounded px-8 pt-6 pb-8 mb-4 grid place-items-center">
          <i className="bx bxs-package text-primary text-[200px]"></i>
          <p className="text-center text-primary">لا يوجد كوبونات</p>
        </div>
      </div>
    );
  }

  const coupons = data?.coupons;

  return (
    <>
      <div className="w-full h-screen grid place-items-center my-5">
        {coupons?.map((coupon: Coupon) => (
          <Coupon coupon={coupon} />
        ))}
      </div>
    </>
  );
}

export default Coupons;
