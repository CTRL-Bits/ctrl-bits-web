import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe, MessageSquare, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  jobFunction: string;
  serviceInterest: string;
  message: string;
}

export default function ITContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    jobFunction: "",
    serviceInterest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-3">
            Get in Touch
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Our team of IT experts is ready to help you transform your business
            with cutting-edge technology solutions.
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General Inquiries</TabsTrigger>
            <TabsTrigger value="support">Technical Support</TabsTrigger>
            <TabsTrigger value="sales">Sales & Projects</TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-5 gap-8">
            <Card className="lg:col-span-2 p-6 border shadow-sm">
              <TabsContent value="general" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <Link
                        to="mailto:info@ctrlbits.xyz"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        info@ctrlbits.xyz
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        +977-9766584525
                      </p>
                      <p className="text-xs text-slate-500">
                        Monday-Friday, 9AM-6PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Support Email</h3>
                      <Link
                        to="mailto:support@ctrlbits.xyz"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        support@ctrlbits.xyz
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Support Hotline</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        +977-9709659012
                      </p>
                      <p className="text-xs text-slate-500">
                        24/7 Technical Support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        Available on our client portal
                      </p>
                      <Link
                        to="#"
                        className="text-blue-600 hover:underline dark:text-blue-400 text-sm"
                      >
                        Login to Portal →
                      </Link>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription>
                      For faster resolution, please have your client ID ready
                      when contacting support.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>

              <TabsContent value="sales" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Sales Inquiries</h3>
                      <Link
                        to="mailto:sales@ctrlbits.xyz"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        sales@ctrlbits.xyz
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Sales Team</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        +977-9862478661
                      </p>
                      <p className="text-xs text-slate-500">
                        Monday-Friday, 8AM-7PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Globe className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Schedule a Demo</h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-1">
                        See our solutions in action
                      </p>
                      <Link
                        to="#"
                        className="text-blue-600 hover:underline dark:text-blue-400 text-sm"
                      >
                        Book a 30-minute demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Card>

            <Card className="lg:col-span-3 p-8 border shadow-sm">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-center">
                    Thank You!
                  </h3>
                  <p className="text-center text-slate-500 max-w-md">
                    Your message has been received. One of our IT specialists
                    will get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Contact Our Team</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Tell us about your IT needs and our experts will get back
                      to you within 24 hours.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country/Region *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleSelectChange("country", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="eu">European Union</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobFunction">Job Function *</Label>
                      <Select
                        value={formData.jobFunction}
                        onValueChange={(value) =>
                          handleSelectChange("jobFunction", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="executive">
                            Executive/C-Level
                          </SelectItem>
                          <SelectItem value="it-manager">IT Manager</SelectItem>
                          <SelectItem value="developer">
                            Developer/Engineer
                          </SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceInterest">Service Interest *</Label>
                    <Select
                      value={formData.serviceInterest}
                      onValueChange={(value) =>
                        handleSelectChange("serviceInterest", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="What services are you interested in?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cloud">
                          Cloud Migration & Services
                        </SelectItem>
                        <SelectItem value="security">
                          Cybersecurity Solutions
                        </SelectItem>
                        <SelectItem value="development">
                          Custom Software Development
                        </SelectItem>
                        <SelectItem value="consulting">
                          IT Consulting
                        </SelectItem>
                        <SelectItem value="support">
                          Managed IT Support
                        </SelectItem>
                        <SelectItem value="data">
                          Data Analytics & AI
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Tell us about your project or requirements *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe your IT challenges or project requirements..."
                      className="min-h-32"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
