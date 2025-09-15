import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsAndConditions = () => {
  document.title = "Talagtna | الشروط والأحكام";

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-primary">
            الشروط والأحكام
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-right">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. قبول الشروط
            </h2>
            <p className="text-gray-700 leading-relaxed">
              باستخدامك لتطبيقنا لشراء الأطعمة المجمدة، فإنك توافق على الالتزام
              بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يُرجى عدم
              استخدام التطبيق.
            </p>
          </section>
          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. المنتجات
            </h2>
            <p className="text-gray-700 leading-relaxed">
              نحن نقدم مجموعة من المنتجات الغذائية المجمدة بجودة عالية. نقوم
              بتحديث الكتالوج بانتظام، لكن لا نضمن توافر كل منتج في جميع
              الأوقات.
            </p>
          </section>
          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. الطلبات والدفع
            </h2>
            <p className="text-gray-700 leading-relaxed">
              جميع الطلبات تتم عبر التطبيق ويجب دفع قيمتها إلكترونيًا. تحتفظ
              الشركة بحقها في رفض أو إلغاء أي طلب في حال وجود خطأ في المعلومات
              أو في الدفع.
            </p>
          </section>
          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. التوصيل
            </h2>
            <p className="text-gray-700 leading-relaxed">
              نقوم بتوصيل المنتجات في الأوقات والمواقع المحددة من قبل المستخدم.
              نحرص على الحفاظ على جودة المنتجات أثناء التوصيل، لكن المستخدم
              مسؤول عن استلام المنتجات في الوقت المناسب.
            </p>
          </section>
          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. الإلغاء والاسترجاع
            </h2>
            <p className="text-gray-700 leading-relaxed">
              نظرًا لطبيعة المنتجات المجمدة، فإن سياسة الإلغاء والاسترجاع تخضع
              لشروط صارمة. لا يمكن إرجاع المنتجات بعد استلامها إلا في حال وجود
              خلل أو تلف واضح.
            </p>
          </section>
          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. الخصوصية
            </h2>
            <p className="text-gray-700 leading-relaxed">
              نحن نحترم خصوصيتك ونلتزم بحماية بياناتك. تُستخدم المعلومات التي
              تجمعها المنصة لتحسين تجربتك فقط ولن يتم مشاركتها مع أي جهة خارجية
              دون إذن.
            </p>
          </section>
          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. التعديلات
            </h2>
            <p className="text-gray-700 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين
              بالتغييرات عند حدوثها، ويُعتبر الاستمرار في استخدام التطبيق موافقة
              على الشروط المعدلة.
            </p>
          </section>

          <div className="text-sm text-gray-500 text-center mt-10">
            <p>آخر تحديث: مايو 2025</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default TermsAndConditions;
