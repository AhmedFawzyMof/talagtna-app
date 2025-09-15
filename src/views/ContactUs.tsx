import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_URL } from "../config/config";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  document.title = "Talagtna | تواصل معنا";

  const mutation = useMutation({
    mutationFn: async (data: unknown) => {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      if (!response.ok) {
        toast.error("فشل في إرسال الرسالة");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("تم إرسال الرسالة بنجاح");
    },
    onError: () => {
      toast.error("فشل في إرسال الرسالة");
    },
  });

  const sendDataToServer = () => {
    mutation.mutate({ name, email, phone, message });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div className="lg:col-span-2 lg:py-12">
          <p className="max-w-xl text-lg">
            وفي الوقت نفسه، فإن حقيقة استقلالنا التام عن الشركة المصنعة وعن
            سيطرة المجموعة الأخرى تمنحك الثقة في أننا سنوصي فقط بما هو مناسب لك.
          </p>

          <div className="mt-8">
            <a
              href="tel:01212158465"
              className="text-2xl font-bold text-primary hover:underline"
            >
              01212158465
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <div id="contactForm" className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="name">
                الاسم
              </label>
              <input
                className="w-full rounded-lg border border-primary p-3 text-sm"
                placeholder="الاسم"
                type="text"
                required
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">
                  البريد الالكتروني
                </label>
                <input
                  className="w-full rounded-lg border border-primary p-3 text-sm"
                  placeholder="البريد الالكتروني"
                  type="email"
                  required
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  رقم الهاتف
                </label>
                <input
                  dir="rtl"
                  className="w-full rounded-lg border border-primary p-3 text-sm"
                  placeholder="رقم الهاتف"
                  required
                  type="tel"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="message">
                الرسالة
              </label>

              <textarea
                className="w-full rounded-lg border border-primary p-3 text-sm"
                placeholder="الرسالة"
                required
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                onClick={sendDataToServer}
                className="w-full rounded-lg bg-primary px-5 py-3 font-medium text-white sm:w-auto flex justify-center items-center gap-5 duration-300 transition-all border hover:border-primary hover:bg-white hover:text-primary"
              >
                <p>ارسال</p>
                <i className="bx bx-send rotate-180 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
