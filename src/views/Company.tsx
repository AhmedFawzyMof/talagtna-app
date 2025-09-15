import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/Product";
import { BASE_URL, IMAGE_BASE_URL } from "../config/config";
import { useAuthStore } from "../store/AuthStore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import type { Company, Product } from "@/config/types";

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

function Company() {
  const authStore = useAuthStore((state) => state);
  const { name } = useParams<{ name: string }>();
  const [category, setCategory] = useState("");
  const urlQuery = useUrlQuery();

  useEffect(() => {
    setCategory(urlQuery.get("category") ?? "");
  }, [category, urlQuery.get("category")]);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["company", category],
    queryFn: () =>
      fetch(`${BASE_URL}/company/${name}?category=${category}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }).then((res) => res.json()),
  });
  document.title = `Talagtna | ${name}`;

  if (isLoading) return <Loading />;

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  const company: Company = data?.company ?? {};
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
      <div className="company my-3 flex flex-col sm:flex-row gap-5 bg-white rounded shadow items-center sm:items-start p-4">
        <img
          src={`${IMAGE_BASE_URL}${company.image}`}
          alt={company.name}
          className="rounded w-1/2 md:w-[225px]"
        />

        <h1 className="text-2xl font-bold mt-3 text-primary text-center">
          {company.name}
        </h1>
      </div>

      <div className="products grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-5">
        {products.length === 0 && (
          <p className="col-span-4 text-center">لا يوجد منتجات</p>
        )}
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            inFavorites={false}
            refetch={refetch}
            isAuthenticated={authStore.isAuthenticated}
          />
        ))}
      </div>
    </>
  );
}

export default Company;
