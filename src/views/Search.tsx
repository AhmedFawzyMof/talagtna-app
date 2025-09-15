import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import ProductCard from "../components/Product";
import { useAuthStore } from "../store/AuthStore";
import { Loading } from "../components/Loading";
import { Product } from "../config/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Search() {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get("query") || ""
  );

  const authStore = useAuthStore((state) => state);

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("query") || "");
  }, []);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      fetch(`${BASE_URL}/products/search`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }).then((res) => res.json()),

    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

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

  if (isLoading) return <Loading />;

  if (error)
    return (
      <main className="grid place-items-center mt-10">
        <Card className="p-6 w-full max-w-md text-center">
          <CardTitle className="text-red-500">خطأ</CardTitle>
          <CardContent>
            <p className="text-gray-600">حدث خطأ: {(error as Error).message}</p>
            <Button onClick={() => refetch()} className="mt-4">
              إعادة المحاولة
            </Button>
          </CardContent>
        </Card>
      </main>
    );

  if (products.length === 0) {
    return (
      <main className="grid place-items-center mt-10">
        <Card className="p-6 w-full max-w-md text-center">
          <CardTitle>لا توجد منتجات</CardTitle>
          <CardContent>
            <p className="text-gray-600">لم يتم العثور على نتائج لـ: {query}</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header with search query */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            نتائج البحث عن: <span className="text-primary">{query}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن المنتجات..."
            />
            <Button onClick={() => refetch()}>بحث</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products grid */}
      <div className="products grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            inFavorites={!!product.isFavorite}
            isAuthenticated={authStore.isAuthenticated}
            refetch={refetch}
          />
        ))}
      </div>
    </main>
  );
}

export default Search;
