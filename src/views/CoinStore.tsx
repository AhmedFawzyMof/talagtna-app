import { useQuery } from "@tanstack/react-query";
import { BASE_URL, IMAGE_BASE_URL } from "../config/config";
import CarouselComponent from "../components/Carousel";
import { useAuthStore } from "../store/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCartStore } from "../store/CartStore";
import { Loading } from "../components/Loading";
import { Product, Offer, CartProduct } from "../config/types";

export default function CoinStore() {
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["coinstore"],
    queryFn: () =>
      fetch(`${BASE_URL}/products/coinstore`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      navigate("/");
    }

    if (data) {
      cartStore.setCoins(data.coins);
    }
  }, [authStore.isAuthenticated, data]);
  const products: Product[] = data?.products ?? [];
  const offers: Offer[] = data?.offers ?? [];

  if (isLoading) return <Loading />;

  document.title = "Talagtna | متجر النقاط";

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  const handelOrderNow = (product: CartProduct) => {
    cartStore.addToCart(product);
  };

  return (
    <>
      <CarouselComponent offers={offers} />

      <div className="">
        الرصيد الحالي من النقاط:{" "}
        <span className="text-primary">{cartStore.coins}</span>
      </div>
      <div className="products grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-5">
        {products.map(
          (product: Product) =>
            product.available === 0 && (
              <div
                key={product.id}
                className="block rounded-lg p-4 shadow-lg bg-white relative"
              >
                {cartStore.coins <= 3000 ? (
                  <div>
                    <p className="w-full text-center absolute z-30 text-primary font-bold top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
                      {cartStore.coins < 3000 &&
                        "يجب أن تكون نقاطك أكثر من 3000"}
                    </p>
                    <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 rounded bg-black w-full h-full opacity-50 grid place-items-center"></div>
                  </div>
                ) : (
                  cartStore.coins < product.price * 50 && (
                    <div>
                      <p className="w-full text-center absolute z-30 text-primary font-bold top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
                        نقاطك ليست كافية
                      </p>
                      <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 rounded bg-black w-full h-full opacity-50 grid place-items-center"></div>
                    </div>
                  )
                )}
                {cartStore.coins > product.price * 50 &&
                  cartStore.coins >= 3000 && (
                    <button
                      onClick={() =>
                        handelOrderNow({
                          id: product.id,
                          quantity: 1,
                          name: product.name,
                          image: product.image,
                          price: product.price * 50,
                          with_coins: true,
                        })
                      }
                      className="absolute top-5 bg-primary-500 p-2 rounded-md text-white shadow"
                    >
                      اشتري الان
                    </button>
                  )}
                <Link to={`/products/${product.id}?coin_store=true`}>
                  <img
                    alt={product.name}
                    src={IMAGE_BASE_URL + product.image}
                    className="h-56 w-full rounded-md object-cover"
                  />
                </Link>
                <Link to={`/products/${product.id}?coin_store=true`}>
                  <div className="mt-2">
                    <dl>
                      <div>
                        <dt className="sr-only">Price</dt>
                        <dd className="text-sm text-primary">
                          {product.price * 50} نقط
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">Product Name</dt>

                        <dd className="font-medium">{product.name}</dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              </div>
            )
        )}
        {products.length === 0 && (
          <p className="col-span-4 text-center">لا يوجد منتجات</p>
        )}
      </div>
    </>
  );
}
