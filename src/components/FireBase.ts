import { useEffect } from "react";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";

function usePushNotifications() {
  useEffect(() => {
    const initPush = async () => {
      const permStatus = await FirebaseMessaging.requestPermissions();
      if (permStatus.receive === "granted") {
        console.log("Push permission granted");
      }

      const token = await FirebaseMessaging.getToken();
      console.log("FCM Token:", token.token);

      FirebaseMessaging.addListener("tokenReceived", (event) => {
        console.log("New token:", event.token);
      });

      FirebaseMessaging.addListener("notificationReceived", (event) => {
        console.log("Notification received:", event);
      });

      FirebaseMessaging.addListener("notificationActionPerformed", (event) => {
        console.log("Notification action performed:", event);
      });
    };

    initPush();
  }, []);
}

export default usePushNotifications;
