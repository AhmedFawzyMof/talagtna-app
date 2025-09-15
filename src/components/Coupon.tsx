import { useCartStore } from "../store/CartStore";

interface Coupon {
  code: string;
  value: number;
}

function Coupon({ coupon }: { coupon: Coupon }) {
  const setCoupon = useCartStore((state) => state.setDiscount);
  return (
    <div className="w-11/12 md:w-5/6 relative">
      <div className="bg-white shadow-md h-32 rounded mb-4 grid place-items-center grid-cols-3 grid-rows-1">
        <div className="body col-span-2 bg-primary w-full h-full grid place-items-center">
          <h1 className="text-white text-center">{coupon.code}</h1>
        </div>
        <h1 className="col-span-1 rotate-90">{coupon.value} EGP</h1>
      </div>
      <button
        onClick={() => setCoupon(coupon.code, coupon.value)}
        className="bg-primary text-white absolute h-10 w-24 rounded -top-10 left-0 cursor-pointer"
      >
        استخدام
      </button>
    </div>
  );
}

export default Coupon;
