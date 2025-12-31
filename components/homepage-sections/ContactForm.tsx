"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mail, User, MessageSquare, CheckCircle, XCircle } from "lucide-react"

export default function ImprovedContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const url = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || ""

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.result === "success") {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Thank you! Your message has been recorded.",
        })

        setFormData({
          name: "",
          email: "",
          message: "",
        })
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
      // Auto-hide status message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: "" })
      }, 5000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  } as const

  return (
    <section id="contact" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind? Let's talk about how we can help.
            </p>
          </motion.div>

          {/* Status Message */}
          <AnimatePresence>
            {formStatus.submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${formStatus.success
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                >
                  {formStatus.success ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span className="font-medium">{formStatus.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl shadow-lg p-2 md:p-10"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
                <label htmlFor="name" className="block text-foreground font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === "name" ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="Your name"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
                <label htmlFor="email" className="block text-foreground font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === "email" ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
                <label htmlFor="message" className="block text-foreground font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare
                    className={`absolute left-4 top-4 h-5 w-5 transition-colors ${focusedField === "message" ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full bg-primary text-primary-foreground font-semibold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.form>

          {/* Additional Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-center text-muted-foreground"
          >
            <p>
              Or email us directly at{" "}
              <a
                href="mailto:support@agilecoder.in"
                className="text-foreground font-medium hover:underline"
              >
                support@agilecoder.in
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}