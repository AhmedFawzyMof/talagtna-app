import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "@/config/routes";
import { Toaster } from "@/components/ui/sonner";
import usePushNotifications from "@/components/FireBase";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" expand={false} richColors />
      <RouterProvider router={router} />
      <PushNotificationInitializer />
    </QueryClientProvider>
  );
}

function PushNotificationInitializer() {
  usePushNotifications();
  return null;
}

export default App;
