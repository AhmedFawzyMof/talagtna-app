import { useEffect } from "react";
import { Loading } from "../components/Loading";
import ProductCard from "../components/Product";
import { toast } from "sonner";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import { Product } from "@/config/types";

export default function Favorites() {
  const authStore = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      toast.error("يجب عليك تسجيل الدخول");
      navigate("/");
    }
  }, [authStore.isAuthenticated]);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      fetch(`${BASE_URL}/user/favorites`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }).then((res) => res.json()),
  });

  document.title = "Talagtna | المفضلات";

  useEffect(() => {
    if (data) {
      authStore.favoritesNumber(data.favorites);
    }
  }, [data]);

  const products: Product[] = data?.products ?? [];

  if (!authStore.isAuthenticated) return null;

  if (isLoading) return <Loading />;

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  return (
    <>
      {products.length === 0 && (
        <div className="w-full h-screen grid place-items-center">
          <p>لا يوجد منتجات في المفضلات</p>
        </div>
      )}
      <div className="products my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-5">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            inFavorites={true}
            isAuthenticated={authStore.isAuthenticated}
            refetch={refetch}
          />
        ))}
      </div>
    </>
  );
}
