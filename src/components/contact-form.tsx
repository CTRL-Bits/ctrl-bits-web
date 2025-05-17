import { useState, useRef, useEffect } from "react";
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
import {
  Mail,
  Phone,
  Globe,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ContactFormData } from "@/types";
import axios from "axios";
import VariableProximity from "@/components/variable-proximity-text";

export default function ITContactSection() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    job_function: "",
    service_interest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    //API
    try {
      const response = await axios.post(
        "https://api.ctrlbits.xyz/api/contact/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Checking if the request is successful or not
      if (response.status === 200 || response.status === 201) {
        setFormSubmitted(true);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      // Specific error message
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to submit your inquiry. Please check your connection and try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden transition-all duration-700 ease-out">
      {/* Background gradients similar to hero section */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute top-1/2 -left-48 h-96 w-96 rounded-full bg-secondary/20 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div
        className="absolute bottom-24 right-1/3 h-64 w-64 rounded-full bg-accent/15 blur-3xl transform-gpu"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />

      <div
        ref={containerRef}
        className="mx-auto max-w-6xl px-4 lg:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6 transition-all duration-700 delay-100">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
              Let's Connect
            </span>
          </div>

          <div className="variable-font-container transition-all duration-700 delay-200">
            <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-3">
              <VariableProximity
                label="Get in Touch"
                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                toFontVariationSettings="'wght' 800, 'wdth' 125"
                containerRef={containerRef}
                radius={200}
                falloff="gaussian"
                className="font-bold transition-all duration-100 variable-font bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary"
              />
            </h2>
          </div>

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-4 transition-all duration-700 delay-300">
            Our team of IT experts is ready to help you transform your business
            with
            <span className="font-medium text-foreground relative ml-1">
              cutting-edge technology solutions
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 rounded-full"></span>
            </span>
            .
          </p>
        </div>

        <Tabs
          defaultValue="general"
          className="w-full transition-all duration-700 delay-400"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 backdrop-blur-md bg-background/70 border border-muted/20 p-1 rounded-full">
            <TabsTrigger value="general" className="rounded-full">
              General Inquiries
            </TabsTrigger>
            <TabsTrigger value="support" className="rounded-full">
              Technical Support
            </TabsTrigger>
            <TabsTrigger value="sales" className="rounded-full">
              Sales & Projects
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-5 gap-8">
            <Card className="lg:col-span-2 p-6 border border-muted/30 shadow-lg bg-background/80 backdrop-blur-md rounded-xl transition-all duration-700 delay-500 hover:shadow-xl hover:bg-background/90">
              <TabsContent value="general" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <Link
                        to="mailto:info@ctrlbits.xyz"
                        className="text-blue-600 hover:underline dark:text-blue-400 group"
                      >
                        <span className="flex items-center">
                          info@ctrlbits.xyz
                          <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
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

                  <div className="mt-6 pt-6 border-t border-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Need an immediate response? Our team typically replies
                      within 24 hours.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Support Email</h3>
                      <Link
                        to="mailto:support@ctrlbits.xyz"
                        className="text-blue-600 hover:underline dark:text-blue-400 group"
                      >
                        <span className="flex items-center">
                          support@ctrlbits.xyz
                          <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        Available on our client portal
                      </p>
                      <Link
                        to="#"
                        className="text-blue-600 hover:underline dark:text-blue-400 text-sm group inline-flex items-center"
                      >
                        Login to Portal
                        <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 transition-all hover:bg-blue-100 dark:hover:bg-blue-900/30">
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sales Inquiries</h3>
                      <Link
                        to="mailto:sales@ctrlbits.xyz"
                        className="text-blue-600 hover:underline dark:text-blue-400 group"
                      >
                        <span className="flex items-center">
                          sales@ctrlbits.xyz
                          <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Schedule a Demo</h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-1">
                        See our solutions in action
                      </p>
                      <Link
                        to="#"
                        className="text-blue-600 hover:underline dark:text-blue-400 text-sm group inline-flex items-center"
                      >
                        Book a 30-minute demo
                        <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Card>

            <Card className="lg:col-span-3 p-8 border border-muted/30 shadow-lg bg-background/80 backdrop-blur-md rounded-xl relative overflow-hidden transition-all duration-700 delay-600 hover:shadow-xl hover:bg-background/90">
              {/* Subtle decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                    <CheckCircle className="h-8 w-8 text-green-600" />
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
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        country: "",
                        job_function: "",
                        service_interest: "",
                        message: "",
                      });
                    }}
                    className="mt-4 rounded-full px-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Contact Our Team</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Tell us about your IT needs and our experts will get back
                      to you within 24 hours.
                    </p>
                  </div>

                  {error && (
                    <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <AlertDescription className="text-red-600 dark:text-red-400">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 group">
                      <Label
                        htmlFor="name"
                        className="group-focus-within:text-primary transition-colors"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="email"
                        className="group-focus-within:text-primary transition-colors"
                      >
                        Work Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="company"
                        className="group-focus-within:text-primary transition-colors"
                      >
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="phone"
                        className="group-focus-within:text-primary transition-colors"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="country"
                        className="group-focus-within:text-primary transition-colors"
                      >
                        Country/Region *
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleSelectChange("country", value)
                        }
                        required
                      >
                        <SelectTrigger className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all">
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

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="jobFunction"
                        className="group-focus-within:text-primary transition-colors"
                      >
                        Job Function *
                      </Label>
                      <Select
                        value={formData.job_function}
                        onValueChange={(value) =>
                          handleSelectChange("job_function", value)
                        }
                        required
                      >
                        <SelectTrigger className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all">
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

                  <div className="space-y-2 group">
                    <Label
                      htmlFor="serviceInterest"
                      className="group-focus-within:text-primary transition-colors"
                    >
                      Service Interest *
                    </Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) =>
                        handleSelectChange("service_interest", value)
                      }
                      required
                    >
                      <SelectTrigger className="rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all">
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

                  <div className="space-y-2 group">
                    <Label
                      htmlFor="message"
                      className="group-focus-within:text-primary transition-colors"
                    >
                      Tell us about your project or requirements *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe your IT challenges or project requirements..."
                      className="min-h-32 rounded-lg border-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 rounded-full pl-6 pr-5 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all group overflow-hidden relative"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </Tabs>
      </div>

      {/* Add keyframe animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
