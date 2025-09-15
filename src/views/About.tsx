import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function About() {
  document.title = "Talagtna | عنا";

  return (
    <main className="mx-auto max-w-screen-md px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            عنا
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="goal">
              <AccordionTrigger className="text-primary font-medium">
                الهدف ؟
              </AccordionTrigger>
              <AccordionContent>
                هدفنا هو إرضاء العملاء وتوفير لكم افضل المنتجات بأرخص الأسعار.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="activity">
              <AccordionTrigger className="text-primary font-medium">
                النشاط ؟
              </AccordionTrigger>
              <AccordionContent>بيع المنتجات المجمدات.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="message">
              <AccordionTrigger className="text-primary font-medium">
                رسالة للمستخدم ؟
              </AccordionTrigger>
              <AccordionContent>
                نشكركم علي حسن تعاونكم معنا ونرجو أن نكون عند حسن ظنكم.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="variety">
              <AccordionTrigger className="text-primary font-medium">
                تنوع المنتجات ؟
              </AccordionTrigger>
              <AccordionContent>
                يوفر "تلاجتنا" تشكيلة واسعة من المجمدات بمختلف الأنواع والنكهات،
                مما يتيح للعملاء اختيار ما يفضلونه وفقًا لذوقهم الشخصي.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="quality">
              <AccordionTrigger className="text-primary font-medium">
                الجودة ؟
              </AccordionTrigger>
              <AccordionContent>
                تهتم "تلاجتنا" بتقديم المنتجات ذات الجودة العالية، حيث يتم
                اختيار المكونات باهتمام واتباع معايير صارمة.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="personal-taste">
              <AccordionTrigger className="text-primary font-medium">
                ملائمة للذوق الشخصي ؟
              </AccordionTrigger>
              <AccordionContent>
                يوفر "تلاجتنا" تشكيلة كبيرة وواسعة ومختلفة من المنتجات ويخدم هذا
                الاختلاف العميل بحيث يجد كل عميل ما يناسب ذوقه الشخصي.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery">
              <AccordionTrigger className="text-primary font-medium">
                خدمة التوصيل ؟
              </AccordionTrigger>
              <AccordionContent>
                يوفر "تلاجتنا" خدمة توصيل سريعة وموثوقة، مما يوفر الوقت والجهد
                للعملاء ويتيح لهم الاستمتاع بالمجمدات في أي وقت.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}

export default About;
