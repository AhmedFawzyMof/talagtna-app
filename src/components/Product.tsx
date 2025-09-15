import { Link } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_URL, IMAGE_BASE_URL } from "../config/config";
import { FaCartPlus, FaPlus, FaMinus, FaHeart } from "react-icons/fa6";
import { Product } from "../config/types";

function ProductCard({
  product,
  isAuthenticated,
  inFavorites,
  refetch,
}: {
  product: Product;
  isAuthenticated: boolean;
  inFavorites: boolean;
  refetch: () => void;
}) {
  const isAuth = isAuthenticated;
  const authStore = useAuthStore((state) => state);
  const cart = useCartStore((state) => state.cart);
  const [isInCart, setInCart] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const [quantity, setQuantity] = useState(1);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  const mutation = useMutation({
    mutationFn: async (data: unknown) => {
      const response = await fetch(`${BASE_URL}/user/fav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("فشلت في الإضافة إلى المفضلة");
      }
      const responseData = await response.json();
      if (responseData.success) {
        toast.success("تمت الإضافة إلى المفضلة بنجاح");
        if (typeof refetch === "function") refetch();
        authStore.setFavorites();
      } else {
        toast.error("المنتج موجود بالفعل في المفضلة");
      }
    },

    onError: () => {
      toast.error("فشلت في الإضافة إلى المفضلة");
    },
  });

  const removefromFav = useMutation({
    mutationFn: async (data: unknown) => {
      const response = await fetch(`${BASE_URL}/user/fav`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("فشلت في الحذف من المفضلة");
      }
      const responseData = await response.json();
      if (responseData.success) {
        toast.success("تمت الحذف من المفضلة بنجاح");
        if (typeof refetch === "function") refetch();
        authStore.favoritesNumber(responseData.favoritesNumber ?? 0);
      } else {
        toast.error("فشلت في الحذف من المفضلة");
      }
    },

    onError: () => {
      toast.error("فشلت في الحذف من المفضلة");
    },
  });

  const addToFavourite = () => {
    if (inFavorites) {
      removefromFav.mutate({ product_id: product.id });
      return;
    }
    if (isAuth) {
      mutation.mutate({ product_id: CartProduct.id });
    } else {
      toast.error("يجب عليك تسجيل الدخول");
    }
  };

  useEffect(() => {
    const item = cart.find((item) => item.id === product.id);
    if (item) {
      setInCart(true);
      setQuantity(item.quantity);
    }
  }, [cart, product.id, totalQuantity]);

  const CartProduct = {
    id: product.id,
    quantity: quantity,
    name: product.name,
    image: product.image,
    price: product.price,
    with_coins: false,
  };

  const handelIncrement = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
    incrementQuantity(product.id);
  };

  const handelDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    decrementQuantity(product.id);
  };

  if (product.available === 1) return null;
  return (
    <div
      key={product.id}
      className="block rounded-lg p-4 shadow-lg bg-white relative"
    >
      <Link to={`/products/${product.id}`}>
        <img
          alt={product.name}
          src={IMAGE_BASE_URL + product.image}
          className="h-56 w-full rounded-md object-cover"
        />
      </Link>
      <Link to={`/products/${product.id}`}>
        <div className="mt-2">
          <dl>
            {product.offer > 0 ? (
              <div className="container">
                <div>
                  <dt className="sr-only">Price</dt>

                  <dd className="text-sm text-gray-500 line-through">
                    {product.price + product.offer} ج
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Offer Price</dt>

                  <dd className="text-sm text-primary font-bold">
                    {product.price} ج
                  </dd>
                </div>
              </div>
            ) : (
              <div>
                <dt className="sr-only">Price</dt>

                <dd className="text-sm text-primary">{product.price} ج</dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Product Name</dt>

              <dd className="font-medium">{product.name}</dd>
            </div>
          </dl>
        </div>
      </Link>
      <div className="buttons absolute top-5 left-5 flex flex-col text-primary text-3xl gap-2 md:gap-5">
        <button
          id="addBtn"
          onClick={() => addToCart(CartProduct)}
          className={`${
            isInCart ? "hidden" : "flex"
          } bg-white p-2 rounded shadow z-50x`}
        >
          <FaCartPlus />
        </button>
        <div
          className={`inCart ${
            isInCart ? "flex" : "hidden"
          } bg-white p-1 flex-col items-center rounded shadow gap-2`}
        >
          <button
            onClick={handelIncrement}
            className="text-lg border border-primary rounded-lg cursor-pointer grid place-items-center w-full h-8"
          >
            <FaPlus />
          </button>
          <p className="Quantity text-lg">{quantity}</p>
          <button
            onClick={handelDecrement}
            className="text-lg border border-primary rounded-lg cursor-pointer grid place-items-center w-full h-8"
          >
            <FaMinus />
          </button>
        </div>
        {isAuth && (
          <button
            onClick={addToFavourite}
            id="addToFav"
            className="bg-white p-2 rounded shadow"
          >
            <FaHeart
              className={`${
                product.isFavorite || inFavorites
                  ? "text-primary"
                  : "text-black"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
