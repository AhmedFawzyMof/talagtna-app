import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  useEffect(() => {
    document.title = "Talagtna | الأسئلة الشائعة";
  }, []);

  const faqs = [
    {
      id: "faq1",
      question: "1- لا استطيع تنفيذ طلبي؟",
      answer: (
        <>
          <p>لا تقلق بشأن ذلك، تأكد أنه:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>أدخلت بنجاح أقل قيمة للطلب وهي 50 جنيها</li>
            <li>أدخلت كل بياناتك.</li>
            <li>
              إذا قمت بحفظ الطلب عن طريق الخطأ، تأكد أنك أدخلت بيانات الدفع
              الصحيحة.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "faq2",
      question: "2- لا أستطيع الدفع ببطاقتي إلكترونياً؟",
      answer: (
        <>
          <p>هناك عدة أسباب قد تسبب فشل في عملية الدفع:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>تأكد أنك تستخدم البطاقة الصحيحة.</li>
            <li>
              تأكد من تاريخ صلاحية البطاقة والبيانات أو استخدم بطاقة أخرى.
            </li>
            <li>
              إذا استمرت المشكلة يمكنك الدفع نقدا حاليا واستخدام البطاقه في وقت
              لاحق.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "faq3",
      question: "3- كيف أنزل البرنامج على موبايلك المحمول؟",
      answer: (
        <p>
          ادخل على القائمة الخاصة بالبرنامج، واختر تحميل التطبيق. ستجد في الشرح
          بالتفصيل وصورة التحميل.
        </p>
      ),
    },
    {
      id: "faq4",
      question: "4- إزاي أطلب؟",
      answer: <p>اختر المنتج → أضف للسلة → ادخل بياناتك → أكد الطلب.</p>,
    },
    {
      id: "faq5",
      question: "5- الوقت المستغرق لتوصيل الطلب؟",
      answer: (
        <p>
          قد يستغرق التوصيل من 30 دقيقة الي 90 دقيقة حسب منطقة التوصيل الخاصة
          بك.
        </p>
      ),
    },
  ];

  return (
    <div className="my-10 mx-auto w-[95%] md:w-[80%] bg-white rounded-xl shadow-md p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
        الأسئلة الشائعة
      </h1>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-right text-primary font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed text-right">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
