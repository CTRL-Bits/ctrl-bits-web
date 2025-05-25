import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, Globe } from "lucide-react";

const TermsAndConditions: React.FC = () => {
  const handleDownloadPDF = () => {
    // Create a new window with the content for PDF generation
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Terms and Conditions - Ctrl Bits</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
            }
            h1 { 
              color: #1a1a1a;
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 10px;
            }
            h2 { 
              color: #374151;
              margin-top: 30px;
            }
            ul { 
              margin: 10px 0;
            }
            li { 
              margin: 5px 0;
            }
            .contact-info {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              margin-top: 30px;
            }
            .updated-date {
              font-style: italic;
              color: #6b7280;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Terms and Conditions</h1>
          <p class="updated-date"><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
          
          <p>Welcome to <strong>ctrlbits.xyz</strong> ("Website"). These Terms and Conditions ("Terms") govern your access to and use of this Website and any related services provided by <strong>Ctrl Bits</strong> ("Company", "we", "our", or "us").</p>
          
          <p>By accessing or using this Website, you agree to comply with and be bound by these Terms. If you do not agree, please do not use our Website or services.</p>
          
          <h2>1. Use of the Website</h2>
          <ul>
            <li>You must be at least 18 years old to use our services.</li>
            <li>You agree to use the Website for lawful purposes only.</li>
            <li>You must not misuse the Website by knowingly introducing viruses, trojans, or other harmful material.</li>
          </ul>
          
          <h2>2. Intellectual Property</h2>
          <p>All content on this Website, including but not limited to logos, graphics, software, text, and design, is the property of Ctrl Bits or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without explicit written permission.</p>
          
          <h2>3. Services</h2>
          <p>Ctrl Bits provides IT solutions including (but not limited to):</p>
          <ul>
            <li>Web Development</li>
            <li>Software Development</li>
            <li>IT Consultation</li>
            <li>UI/UX Design</li>
            <li>System Integration</li>
          </ul>
          <p>We reserve the right to modify or discontinue any service at any time without notice.</p>
          
          <h2>4. User Submissions</h2>
          <p>By submitting inquiries, feedback, or content through our Website, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, and display such content for the purpose of operating and improving our services.</p>
          
          <h2>5. Payments and Contracts</h2>
          <p>Specific services may require a contract and agreed-upon payment terms. Any project-specific agreements will supersede these general Terms in case of a conflict.</p>
          
          <h2>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Ctrl Bits shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of the Website or services.</p>
          
          <h2>7. Privacy</h2>
          <p>Your use of this Website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your data.</p>
          
          <h2>8. External Links</h2>
          <p>This Website may contain links to third-party websites. Ctrl Bits has no control over the content or availability of these sites and is not responsible for any damage or loss caused by your use of these third-party services.</p>
          
          <h2>9. Termination</h2>
          <p>We reserve the right to restrict or terminate your access to the Website at any time without notice for violating these Terms.</p>
          
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of <strong>[Your Country/State]</strong>, without regard to its conflict of law principles.</p>
          
          <h2>11. Changes to Terms</h2>
          <p>We may revise these Terms at any time by updating this page. Your continued use of the Website following changes constitutes acceptance of those changes.</p>
          
          <div class="contact-info">
            <h2>Contact</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p><strong>📧 Email:</strong> hello@ctrlbits.xyz</p>
            <p><strong>🌐 Website:</strong> https://ctrlbits.xyz</p>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen py-24 md:py-32 lg:py-40 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Download Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
            <p className="text-muted-foreground italic">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <Button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <Card className="shadow-xl border-0  backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Introduction */}
            <div className="mb-6">
              <p className=" leading-relaxed mb-4">
                Welcome to{" "}
                <strong className="text-blue-600">ctrlbits.xyz</strong>{" "}
                ("Website"). These Terms and Conditions ("Terms") govern your
                access to and use of this Website and any related services
                provided by <strong className="text-blue-600">Ctrl Bits</strong>{" "}
                ("Company", "we", "our", or "us").
              </p>
              <p className=" leading-relaxed">
                By accessing or using this Website, you agree to comply with and
                be bound by these Terms. If you do not agree, please do not use
                our Website or services.
              </p>
            </div>

            <Separator className="my-6" />

            {/* Section 1 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                1. Use of the Website
              </h2>
              <ul className="space-y-2 ">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You must be at least 18 years old to use our services.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You agree to use the Website for lawful purposes only.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You must not misuse the Website by knowingly introducing
                  viruses, trojans, or other harmful material.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                2. Intellectual Property
              </h2>
              <p className=" leading-relaxed">
                All content on this Website, including but not limited to logos,
                graphics, software, text, and design, is the property of Ctrl
                Bits or its licensors and is protected by intellectual property
                laws. You may not reproduce, distribute, or create derivative
                works from any content without explicit written permission.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">3. Services</h2>
              <p className=" leading-relaxed mb-3">
                Ctrl Bits provides IT solutions including (but not limited to):
              </p>
              <ul className="space-y-2  mb-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Web Development
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Software Development
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  IT Consultation
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  UI/UX Design
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  System Integration
                </li>
              </ul>
              <p className=" leading-relaxed">
                We reserve the right to modify or discontinue any service at any
                time without notice.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                4. User Submissions
              </h2>
              <p className=" leading-relaxed">
                By submitting inquiries, feedback, or content through our
                Website, you grant us a non-exclusive, royalty-free, worldwide
                license to use, reproduce, and display such content for the
                purpose of operating and improving our services.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                5. Payments and Contracts
              </h2>
              <p className=" leading-relaxed">
                Specific services may require a contract and agreed-upon payment
                terms. Any project-specific agreements will supersede these
                general Terms in case of a conflict.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                6. Limitation of Liability
              </h2>
              <p className=" leading-relaxed">
                To the fullest extent permitted by law, Ctrl Bits shall not be
                liable for any direct, indirect, incidental, or consequential
                damages arising out of your use of the Website or services.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">7. Privacy</h2>
              <p className=" leading-relaxed">
                Your use of this Website is also governed by our Privacy Policy,
                which outlines how we collect, use, and protect your data.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                8. External Links
              </h2>
              <p className=" leading-relaxed">
                This Website may contain links to third-party websites. Ctrl
                Bits has no control over the content or availability of these
                sites and is not responsible for any damage or loss caused by
                your use of these third-party services.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">9. Termination</h2>
              <p className=" leading-relaxed">
                We reserve the right to restrict or terminate your access to the
                Website at any time without notice for violating these Terms.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                10. Governing Law
              </h2>
              <p className=" leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of <strong>[Your Country/State]</strong>, without
                regard to its conflict of law principles.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold  mb-3">
                11. Changes to Terms
              </h2>
              <p className=" leading-relaxed">
                We may revise these Terms at any time by updating this page.
                Your continued use of the Website following changes constitutes
                acceptance of those changes.
              </p>
            </section>

            <Separator className="my-6" />

            {/* Contact Section */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold  flex items-center">
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className=" leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center ">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2 text-blue-600">
                      hello@ctrlbits.xyz
                    </span>
                  </div>
                  <div className="flex items-center ">
                    <Globe className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Website:</span>
                    <span className="ml-2 text-blue-600">
                      https://ctrlbits.xyz
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
