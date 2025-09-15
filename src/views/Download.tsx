import { useState } from "react";
import { IMAGE_BASE_URL } from "../config/config";

export default function Download() {
  const [currentTab, setCurrentTab] = useState("ios");

  return (
    <div dir="rtl" className="h-screen max-w-screen-2xl">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="ios-tab"
              data-tabs-target="#ios"
              type="button"
              role="tab"
              aria-controls="ios"
              aria-selected="false"
              onClick={() => setCurrentTab("ios")}
            >
              IOS
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="android-tab"
              data-tabs-target="#android"
              type="button"
              role="tab"
              aria-controls="android"
              aria-selected="false"
              onClick={() => setCurrentTab("android")}
            >
              ANDROID
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          className={`${
            currentTab === "ios" ? "block" : "hidden"
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
          id="ios"
          role="tabpanel"
          aria-labelledby="ios-tab"
        >
          <p>قم بالفتح من متصفح سفاري ثم اضغط على رمز المشاركه</p>
          <img src={`${IMAGE_BASE_URL}/img/ios-step1.jpeg`} />
          <p>ثم اضغط على اضافه الي الصفحه الرئيسيه</p>
          <img src={`${IMAGE_BASE_URL}/img/ios-step2.jpeg`} />
          <p>سوف يتم تنزيل التطبيق على الهاتف</p>
          <img src={`${IMAGE_BASE_URL}/img/ios-step3.jpeg`} />
        </div>
        <div
          className={`${
            currentTab === "android" ? "block" : "hidden"
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
          id="android"
          role="tabpanel"
          aria-labelledby="android-tab"
        >
          <p>اضغط هنا اذا كان هاتفك اندرويد</p>
          <img src={`${IMAGE_BASE_URL}/img/android-step1.jpeg`} />
        </div>
      </div>
    </div>
  );
}
