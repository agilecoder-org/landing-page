"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function SocialsBanner() {
    const socialLinks = [
        {
            icon: Github,
            href: "https://github.com/Agile-Coder-Org",
            label: "GitHub",
        },
        {
            icon: Linkedin,
            href: "https://www.linkedin.com/in/iamsmruti/",
            label: "LinkedIn",
        },
        {
            icon: Mail,
            href: "mailto:agilecoder@outlook.in",
            label: "Email",
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-16 rounded-2xl border bg-muted/30 p-8 text-center"
        >
            <h3 className="text-2xl font-bold mb-4">Enjoyed this read?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Connect with me to discuss technology, share ideas, or just say hello!
                I'm always open to interesting conversations.
            </p>
            <div className="flex justify-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-background border p-3 rounded-full text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-lg transition-all"
                        aria-label={label}
                    >
                        <Icon className="h-5 w-5" />
                    </motion.a>
                ))}
            </div>
        </motion.div>
    )
}
