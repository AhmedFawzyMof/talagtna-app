import About from "@/views/About";
import Category from "@/views/Category";
import Cart from "@/views/Cart";
import Complaint from "@/views/Complaint";
import ContactUs from "@/views/ContactUs";
import Favorites from "@/views/Favorites";
import Home from "@/views/Home";
import Order from "@/views/Order";
import OrderHistory from "@/views/OrderHistory";
import OrderSuccess from "@/views/OrderSuccess";
import ProductView from "@/views/Product";
import Company from "@/views/Company";
import Coupons from "@/views/Coupons";
import Search from "@/views/Search";
import CoinStore from "@/views/CoinStore";
import Download from "@/views/Download";
import TermsAndConditions from "@/views/Terms";
import Faq from "@/views/Faq";
import Layout from "./layout";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "company/:name",
        element: <Company />,
      },
      {
        path: "category/:name",
        element: <Category />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "complaint",
        element: <Complaint />,
      },
      {
        path: "products/:id",
        element: <ProductView />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "ordersuccess/:order",
        element: <OrderSuccess />,
      },
      {
        path: "order/history",
        element: <OrderHistory />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "coupons",
        element: <Coupons />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "coin_store",
        element: <CoinStore />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "/download",
        element: <Download />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
    ],
  },
];
