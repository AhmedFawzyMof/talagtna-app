import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import { useCartStore } from "@/store/CartStore";

import {
  Menu,
  Heart,
  ShoppingCart,
  Download,
  Search,
  Home,
  User,
  FileText,
  Mail,
  Phone,
  X,
  LogOut,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const NavbarSidebar = () => {
  const authStore = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const navigate = useNavigate();

  const isIos = /iphone|ipad|ipod/.test(
    window.navigator.userAgent.toLowerCase()
  );
  const isInStandaloneMode =
    "standalone" in window.navigator && (window.navigator as any).standalone;

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (!isIos && !isInStandaloneMode) {
      setIsInstallable(true);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/search?query=${query}`);
    setQuery("");
  };

  const handleLogout = () => {
    authStore.logout();
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const sidebarLinks = [
    { name: "الصفحة الرئيسية", icon: Home, path: "/" },
    { name: "من نحن", icon: User, path: "/about" },
    { name: "سياسة الخصوصية", icon: User, path: "/privacy" },
    { name: "تواصل معنا", icon: Phone, path: "/contact" },
    { name: "الأسئلة الشائعة", icon: Mail, path: "/faq" },
    {
      name: "سجل الطلبات",
      icon: FileText,
      path: "/order/history",
      auth: true,
    },
    { name: "الشروط والأحكام", icon: FileText, path: "/terms" },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          dir="ltr"
          className="flex items-center justify-between p-4 border-b"
        >
          <div className="flex items-center gap-1">
            <img src="/logo_icon.webp" alt="logo icon" className="w-7" />
            <p className="text-xl font-bold text-primary">Talagtna</p>
          </div>
          <button
            onClick={closeSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {sidebarLinks.map((link, index) =>
            !authStore.isAuthenticated && !link.auth ? (
              <Link
                key={index}
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                <link.icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            ) : (
              <Link
                key={index}
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                <link.icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            )
          )}

          {authStore.isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          )}
        </nav>
      </div>

      <nav
        className={`bg-white w-full shadow-sm border-b px-4 py-3 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-64"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex items-center gap-1">
              <p className="text-xl font-bold text-primary">Talagtna</p>
              <img src="/logo_icon.webp" alt="logo icon" className="w-7" />
            </div>
          </div>

          <form
            onSubmit={handelSubmit}
            className="flex-1 max-w-md mx-4 relative"
          >
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>

          <div className="flex items-center space-x-2">
            {authStore.isAuthenticated && (
              <Link
                to="/favorites"
                className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Favorites"
              >
                <Heart size={24} />
                {authStore.favorites > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {authStore.favorites}
                  </span>
                )}
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {cartStore.cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartStore.cart.length}
                </span>
              )}
            </Link>

            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/70 transition-colors"
              >
                <Download size={20} />
              </button>
            )}

            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarSidebar;
