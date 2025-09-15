import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config/config";
import { Category } from "@/config/types";

export function CategoryDiv(category: Category) {
  return (
    <Link
      key={category.id}
      to={`/category/${category.name}`}
      className="bg-white h-auto shadow-md rounded-md w-full overflow-clip"
    >
      <img
        src={IMAGE_BASE_URL + category.image}
        alt={category.name}
        className="w-full h-[115px] rounded-md"
      />
      <p className="text-center my-1 text-primary text-xs sm:text-sm">
        {category.name}
      </p>
    </Link>
  );
}
