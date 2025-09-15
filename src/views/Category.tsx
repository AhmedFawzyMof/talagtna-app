import { useQuery } from "@tanstack/react-query";
import CarouselComponent from "../components/Carousel";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Product";
import { BASE_URL } from "../config/config";
import { useAuthStore } from "../store/AuthStore";
import { Loading } from "../components/Loading";
import type { Offer, Category, Product } from "@/config/types";

function Category() {
  const authStore = useAuthStore((state) => state);
  const { name } = useParams<{ name: string }>();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["category", { name }],
    queryFn: () =>
      fetch(`${BASE_URL}/category/${name}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }).then((res) => res.json()),
  });

  document.title = `Talagtna | ${name}`;

  if (isLoading) return <Loading />;

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  const offers: Offer[] = data?.offers ?? [];
  const products: Product[] = data?.products ?? [];

  if (data?.favorites) {
    products.forEach((product) => {
      const productInFavorites = data.favorites.find(
        (favorite: any) => favorite.product === product.id
      );

      if (productInFavorites) {
        Object.assign(product, { isFavorite: true });
      }
    });
  }

  return (
    <>
      <CarouselComponent offers={offers} />

      <div className="products grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-5">
        {products.length === 0 && (
          <p className="col-span-4 text-center">لا يوجد منتجات</p>
        )}
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            inFavorites={false}
            isAuthenticated={authStore.isAuthenticated}
            refetch={refetch}
          />
        ))}
      </div>
    </>
  );
}

export default Category;
