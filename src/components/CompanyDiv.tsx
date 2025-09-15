import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config/config";
import { Company } from "@/config/types";

function CompanyDiv(company: Company) {
  if (company.soon === 1)
    return (
      <div className="bg-white h-auto shadow-md rounded-md w-full relative">
        <div className="absolute w-full h-full bg-black/50 rounded-md grid place-items-center">
          <p className="text-primary font-bold text-3xl">قريبا</p>
        </div>
        <img
          src={IMAGE_BASE_URL + company.image}
          alt={company.name}
          className="w-full h-[115px] rounded-md"
        />
        <p className="text-center my-1 text-primary">{company.name}</p>
      </div>
    );
  return (
    <Link
      key={company.id}
      to={`/company/${company.name}`}
      className="bg-white h-auto shadow-md rounded-md w-full"
    >
      <img
        src={IMAGE_BASE_URL + company.image}
        alt={company.name}
        className="w-full h-[115px] rounded-md"
      />
      <p className="text-center my-1 text-primary">{company.name}</p>
    </Link>
  );
}

export default CompanyDiv;
