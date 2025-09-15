import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Complaint() {
  document.title = "Talagtna | الشكوي";

  return (
    <main className="mx-auto my-10 max-w-screen-md px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-bold text-primary">
            سياسة التوصيل والاسترجاع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700 leading-relaxed list-decimal list-inside">
            <li>
              اكتب رسالتك من خلال البرنامج (
              <span className="font-semibold">تواصل معنا</span>) عند وجود أي خطأ
              في الطلب أو شكوى.
            </li>
            <li>إحضار أصل فاتورة الشراء.</li>
            <li>توافر المنتج موضوع الشكوى.</li>
            <li>أن يكون طلب الاسترجاع خلال 24 ساعة من تاريخ الطلب.</li>
            <li>
              أن يكون تم حفظ المنتج بالطريقة الصحيحة، لأن الشركة تخلي مسؤوليتها
              عن سوء التخزين.
            </li>
          </ul>

          <h2 className="mt-10 text-center text-xl md:text-2xl font-semibold text-primary">
            نشكركم على حسن تعاونكم معنا
          </h2>
        </CardContent>
      </Card>
    </main>
  );
}

export default Complaint;
