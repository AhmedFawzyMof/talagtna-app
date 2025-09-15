import { useQuery } from "@tanstack/react-query";
import CarouselComponent from "../components/Carousel";
import { BASE_URL, IMAGE_BASE_URL } from "../config/config";

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { Loading } from "../components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Category, Company, Offer } from "@/config/types";

function Home() {
  const authStore = useAuthStore();
  const { isLoading, error, data } = useQuery({
    queryKey: ["home"],
    queryFn: () => fetch(`${BASE_URL}`).then((res) => res.json()),
  });

  const categories: Category[] = data?.categories ?? [];
  const companies: Company[] = data?.companies ?? [];
  const offers: Offer[] = data?.offers ?? [];

  if (isLoading) return <Loading />;

  document.title = "Talagtna | الرئيسية";

  if (error) return <p>An error has occurred: {(error as Error).message}</p>;

  return (
    <>
      <CarouselComponent offers={offers} />

      <main className="px-3 md:px-6 lg:px-10 py-4">
        <div className="w-full overflow-x-auto py-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-max">
            {companies.map(
              (company: Company) =>
                company.soon === 0 && (
                  <Button
                    asChild
                    key={company.id}
                    variant="outline"
                    className={cn(
                      "bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-400 hover:to-red-400",
                      "text-primary hover:text-white shadow-sm whitespace-nowrap"
                    )}
                  >
                    <Link to={`/company/${company.name}`}>{company.name}</Link>
                  </Button>
                )
            )}
          </div>
        </div>

        <div className="my-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {authStore.isAuthenticated && (
            <Card className="overflow-hidden shadow-md hover:shadow-lg pt-0 pb-1 transition relative">
              <Link to={`/coin_store`}>
                <img
                  src={`${IMAGE_BASE_URL}/img/category/نقاط.webp`}
                  alt="متجر النقاط"
                  className="w-full h-[115px] object-cover"
                />
                <CardContent className="p-2">
                  <p className="text-center font-medium text-primary text-xs sm:text-sm">
                    متجر النقاط
                  </p>
                </CardContent>
              </Link>
            </Card>
          )}

          {categories.map((category: Category) => (
            <Card
              key={category.id}
              className="overflow-hidden shadow-md hover:shadow-lg pt-0 pb-1 transition relative"
            >
              <Link to={`/category/${category.name}`}>
                <div className="relative">
                  <img
                    src={`${IMAGE_BASE_URL}${category.image}`}
                    alt={category.name}
                    className="w-full h-[115px] object-cover"
                  />

                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 bg-primary text-white shadow-md"
                  >
                    {(category.number_of_products ?? 0) > 100
                      ? "100+"
                      : category.number_of_products}{" "}
                    منتج
                  </Badge>
                </div>
                <CardContent className="p-2">
                  <p className="text-center font-medium text-primary text-xs sm:text-sm">
                    {category.name}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
