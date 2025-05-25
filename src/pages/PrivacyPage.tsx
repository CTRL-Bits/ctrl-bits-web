import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, Globe, Shield, Cookie } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const handleDownloadPDF = () => {
    // Create a new window with the content for PDF generation
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Privacy Policy - Ctrl Bits</title>
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
            .cookie-section {
              background: #fef3cd;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Privacy Policy</h1>
          <p class="updated-date"><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
          
          <p>At <strong>Ctrl Bits</strong> ("we", "our", "us"), accessible from <strong>https://ctrlbits.xyz</strong>, your privacy is one of our top priorities. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website or services.</p>
          
          <h2>1. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Contact us through forms or email</li>
            <li>Request a quote or consultation</li>
            <li>Subscribe to our newsletter or updates</li>
          </ul>
          <p>This information may include your name, email address, phone number, company name, and any project-related details you submit.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Improve our website and offerings</li>
            <li>Send occasional updates, newsletters, or promotional materials (only if you've opted in)</li>
            <li>Analyze traffic and usage patterns to improve user experience</li>
          </ul>
          
          <h2>3. Cookies and Tracking Technologies</h2>
          <p>We may use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Understand how visitors use our site</li>
            <li>Improve website performance</li>
          </ul>
          <p>You can choose to disable cookies through your browser settings.</p>
          
          <h2>4. Sharing of Information</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following cases:</p>
          <ul>
            <li>With trusted service providers who assist in operating our website or business (under confidentiality agreements)</li>
            <li>If required by law or to protect our legal rights</li>
          </ul>
          
          <h2>5. Data Security</h2>
          <p>We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is 100% secure.</p>
          
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access or correct your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Withdraw consent to processing (where applicable)</li>
          </ul>
          <p>To exercise these rights, contact us at <strong>hello@ctrlbits.xyz</strong>.</p>
          
          <h2>7. Third-Party Links</h2>
          <p>Our website may contain links to other websites. We are not responsible for the privacy practices or content of those third-party sites.</p>
          
          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with the new effective date.</p>
          
          <div class="cookie-section">
            <h2>🍪 Cookie Policy</h2>
            <p>At Ctrl Bits, we use cookies and similar tracking technologies to enhance your experience on our website.</p>
            
            <h3>What Are Cookies?</h3>
            <p>Cookies are small text files stored on your device when you visit a website. They help us recognize your browser and remember your preferences.</p>
            
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the operation of the website.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our site (e.g., via Google Analytics).</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings.</li>
            </ul>
            
            <h3>How You Can Control Cookies</h3>
            <p>You can choose to accept or refuse cookies via your browser settings. Note that disabling cookies may affect the functionality of some parts of our website.</p>
            <p>For more information about managing cookies, visit: <a href="https://www.allaboutcookies.org">https://www.allaboutcookies.org</a></p>
          </div>
          
          <div class="contact-info">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us at:</p>
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
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-blue-600" />
              Privacy Policy
            </h1>
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

        <Card className="shadow-xl border-0 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Introduction */}
            <div className="mb-6">
              <p className="leading-relaxed mb-4">
                At <strong className="text-blue-600">Ctrl Bits</strong> ("we",
                "our", "us"), accessible from{" "}
                <strong className="text-blue-600">https://ctrlbits.xyz</strong>,
                your privacy is one of our top priorities. This Privacy Policy
                outlines how we collect, use, and protect your personal
                information when you use our website or services.
              </p>
            </div>

            <Separator className="my-6" />

            {/* Section 1 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to
                us when you:
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Contact us through forms or email
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Request a quote or consultation
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Subscribe to our newsletter or updates
                </li>
              </ul>
              <p className="leading-relaxed">
                This information may include your name, email address, phone
                number, company name, and any project-related details you
                submit.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Respond to your inquiries and provide requested services
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Improve our website and offerings
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Send occasional updates, newsletters, or promotional materials
                  (only if you've opted in)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Analyze traffic and usage patterns to improve user experience
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                3. Cookies and Tracking Technologies
              </h2>
              <p className="leading-relaxed mb-3">
                We may use cookies and similar technologies to:
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Remember your preferences
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Understand how visitors use our site
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Improve website performance
                </li>
              </ul>
              <p className="leading-relaxed">
                You can choose to disable cookies through your browser settings.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                4. Sharing of Information
              </h2>
              <p className="leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following cases:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  With trusted service providers who assist in operating our
                  website or business (under confidentiality agreements)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  If required by law or to protect our legal rights
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement reasonable technical and organizational measures to
                protect your personal data from unauthorized access, alteration,
                or disclosure. However, no method of transmission over the
                Internet is 100% secure.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
              <p className="leading-relaxed mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Access or correct your personal data
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Request deletion of your personal data
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Withdraw consent to processing (where applicable)
                </li>
              </ul>
              <p className="leading-relaxed">
                To exercise these rights, contact us at{" "}
                <strong className="text-blue-600">hello@ctrlbits.xyz</strong>.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                7. Third-Party Links
              </h2>
              <p className="leading-relaxed">
                Our website may contain links to other websites. We are not
                responsible for the privacy practices or content of those
                third-party sites.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                8. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. The updated
                version will be posted on this page with the new effective date.
              </p>
            </section>

            <Separator className="my-6" />

            {/* Cookie Policy Section */}
            <Card className="border-amber-2000">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center">
                  <Cookie className="w-6 h-6 mr-3 text-amber-600" />
                  Cookie Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-4">
                  At Ctrl Bits, we use cookies and similar tracking technologies
                  to enhance your experience on our website.
                </p>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    What Are Cookies?
                  </h3>
                  <p className="leading-relaxed">
                    Cookies are small text files stored on your device when you
                    visit a website. They help us recognize your browser and
                    remember your preferences.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Types of Cookies We Use
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Essential Cookies:</strong> Required for the
                        operation of the website.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Analytics Cookies:</strong> Help us understand
                        how users interact with our site (e.g., via Google
                        Analytics).
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Functionality Cookies:</strong> Remember your
                        preferences and settings.
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    How You Can Control Cookies
                  </h3>
                  <p className="leading-relaxed mb-2">
                    You can choose to accept or refuse cookies via your browser
                    settings. Note that disabling cookies may affect the
                    functionality of some parts of our website.
                  </p>
                  <p className="leading-relaxed">
                    For more information about managing cookies, visit:{" "}
                    <a
                      href="https://www.allaboutcookies.org"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.allaboutcookies.org
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-6" />

            {/* Contact Section */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center">
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or how we
                  handle your data, please contact us at:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2 text-blue-600">
                      hello@ctrlbits.xyz
                    </span>
                  </div>
                  <div className="flex items-center">
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

export default PrivacyPolicy;
