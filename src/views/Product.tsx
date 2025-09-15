import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { BASE_URL, IMAGE_BASE_URL } from "../config/config";
import { FaRegHeart, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "sonner";
import { Loading } from "../components/Loading";
import { Product } from "../config/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const [product, setProduct] = useState<Product>({} as Product);
  const [quantity, setQuantity] = useState(1);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const coin_store = params.get("coin_store");

  useEffect(() => {
    const ID = parseInt(id as string);
    const item = cartStore.cart.find((item) => item.id === ID);
    if (item) {
      setQuantity(item.quantity);
    }
  }, [cartStore.cart, id, cartStore.getTotalQuantity()]);

  const handelIncrement = () => {
    const ID = parseInt(id as string);
    const item = cartStore.cart.find((item) => item.id === ID);

    if (item && product.id) {
      incrementQuantity(product.id);
    }

    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const handelDecrement = () => {
    const ID = parseInt(id as string);
    const item = cartStore.cart.find((item) => item.id === ID);

    if (item && product.id) {
      decrementQuantity(product.id);
    }

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["product", id, coin_store],
    queryFn: () =>
      fetch(`${BASE_URL}/products/${id}?coin_store=${coin_store}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }).then((res) => res.json()),
  });

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

  useEffect(() => {
    if (data && data.redirect) {
      navigate("/");
    }
    if (data && data.product) {
      setProduct(data.product);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  if (!product || !product.id) {
    return <p>Product not found.</p>;
  }

  const addToFavourite = () => {
    if (authStore.isAuthenticated) {
      mutation.mutate({ product_id: product.id });
    } else {
      toast.error("يجب عليك تسجيل الدخول");
    }
  };

  document.title = `Talagtna | ${product.name}`;

  const CartProduct = {
    id: product.id,
    quantity: quantity,
    name: product.name,
    image: product.image,
    price: product.price,
    with_coins: coin_store === "true",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="relative max-w-5xl w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-lg rounded-2xl">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Price */}
          {product.offer > 0 ? (
            <div>
              <p className="line-through text-gray-400">
                {product.price + product.offer} ج
              </p>
              <p className="text-2xl font-bold text-primary">
                {product.price} ج
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-primary">
              {coin_store === "true"
                ? `${product.price * 50} نقط`
                : product.price + " ج"}
            </p>
          )}

          {/* Quantity Selector */}
          {coin_store !== "true" && (
            <div className="flex items-center border border-primary rounded-lg w-full max-w-xs overflow-hidden">
              <Button
                variant="ghost"
                onClick={handelDecrement}
                className="flex-1 h-10 rounded-none text-xl hover:bg-primary hover:text-white"
              >
                <FaMinus />
              </Button>
              <span className="px-4 text-lg">{quantity}</span>
              <Button
                variant="ghost"
                onClick={handelIncrement}
                className="flex-1 h-10 rounded-none text-xl hover:bg-primary hover:text-white"
              >
                <FaPlus />
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => cartStore.addToCart(CartProduct)}
              className="w-full max-w-xs bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              اضافة الى السلة
            </Button>

            {authStore.isAuthenticated && coin_store !== "true" && (
              <Button
                onClick={addToFavourite}
                variant="outline"
                className="w-12 h-12 p-0 absolute top-4 left-4 rounded-full shadow-md border-primary text-primary hover:bg-primary hover:text-white transition"
              >
                {data.favorites ? <FaHeart /> : <FaRegHeart />}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductView;
