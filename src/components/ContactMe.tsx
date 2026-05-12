"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, Send, User, AtSign } from "lucide-react";
import { useContactForm, useIntersectionObserver } from "@/hooks";
import {
  contactInfo,
  socialLinks,
  CONTACT_ANIMATION_CONFIG,
} from "@/constants/contactMe";
import { GradientOrbProps, ContactFormFieldProps } from "@/types/contactMe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ThreeBackground = dynamic(
  () => import("./ThreeBackground").then((mod) => mod.ThreeBackground),
  { ssr: false, loading: () => <div /> }
);
const GradientOrb = ({
  className,
  animationDuration,
  delay = 0,
  scaleFrom = 1,
  scaleTo = 1.1,
  opacityFrom = 0.2,
  opacityTo = 0.3,
}: GradientOrbProps) => (
  <motion.div
    animate={{
      scale: [scaleFrom, scaleTo, scaleFrom],
      opacity: [opacityFrom, opacityTo, opacityFrom],
    }}
    transition={{
      duration: animationDuration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    style={{ willChange: "transform, opacity" }}
    className={className}
  />
);
const FormField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  delay,
  isInView,
  required = true,
  rows,
}: ContactFormFieldProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ delay, ease: "easeOut" }}
    className="relative group"
  >
    <Icon
      className={`absolute left-3 ${
        type === "textarea" ? "top-4" : "top-1/2 transform -translate-y-1/2"
      } w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300 z-10`}
    />
    {type === "textarea" ? (
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="pl-12 bg-slate-800/40 border-slate-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 rounded-xl resize-none transition-all duration-300 backdrop-blur-sm"
        required={required}
        aria-label={placeholder}
      />
    ) : (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-12 bg-slate-800/40 border-slate-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 rounded-xl h-12 transition-all duration-300 backdrop-blur-sm"
        required={required}
        aria-label={placeholder}
      />
    )}
  </motion.div>
);
export const ContactMe = () => {
  const { ref, isVisible: isInView } = useIntersectionObserver(
    0.1,
    CONTACT_ANIMATION_CONFIG.viewportMargin
  );

  const {
    values: formData,
    isSubmitting,
    setValue,
    handleSubmit,
  } = useContactForm();
  const memoizedContactInfo = useMemo(() => contactInfo, []);
  const memoizedSocialLinks = useMemo(() => socialLinks, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.name as "name" | "email" | "message", e.target.value);
  };
  const onSubmit = async (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log("Form submitted:", values);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, rotateY: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-6, 6, -6],
      rotate: [0, 1.5, -1.5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const gradientPulseVariants: Variants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-black relative overflow-hidden"
      aria-label="Contact Me Section"
    >
      <ThreeBackground />
      <div className="relative z-10">
        <GradientOrb
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-purple-500/20 rounded-full blur-2xl"
          animationDuration={
            CONTACT_ANIMATION_CONFIG.gradientOrbAnimationDuration
          }
          scaleFrom={1}
          scaleTo={1.1}
          opacityFrom={0.2}
          opacityTo={0.3}
        />

        <GradientOrb
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-2xl"
          animationDuration={18}
          delay={1}
          scaleFrom={1.05}
          scaleTo={1}
          opacityFrom={0.15}
          opacityTo={0.25}
        />

        <GradientOrb
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-xl"
          animationDuration={20}
          delay={0.5}
          scaleFrom={1}
          scaleTo={1.05}
          opacityFrom={0.1}
          opacityTo={0.18}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md rounded-2xl mb-6 border border-slate-700/50 shadow-lg"
              >
                <MessageCircle className="w-8 h-8 text-purple-400" />
              </motion.div>

              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6"
                variants={gradientPulseVariants}
                animate="animate"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #ce7aff, #3b82f6)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let&apos;s Create Something Amazing
              </motion.h2>

              <motion.p
                className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Ready to bring your ideas to life? I&apos;m always excited to
                discuss new opportunities, creative projects, or just have a
                friendly chat about web development and technology.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div variants={cardVariants} className="space-y-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-slate-800/30 to-slate-900/40 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden border border-slate-700/30 shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                      Get In Touch
                    </h3>

                    <div className="space-y-4">
                      {memoizedContactInfo.map((info, index) => (
                        <motion.div
                          key={`contact-${info.label}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            delay: index * 0.1,
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                          whileHover={{ x: 8 }}
                          className="group/item"
                        >
                          <a
                            href={info.href}
                            className="flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/40 backdrop-blur-sm"
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className={`p-3 rounded-xl bg-gradient-to-r ${info.color} backdrop-blur-sm shadow-md`}
                            >
                              <info.icon className="w-5 h-5 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <p className="text-gray-400 text-sm font-medium">
                                {info.label}
                              </p>
                              <p
                                className={`text-white font-semibold ${info.hoverColor} transition-colors duration-300`}
                              >
                                {info.value}
                              </p>
                            </div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-slate-800/30 to-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-700/30 shadow-xl"
                >
                  <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                    Follow My Journey
                  </h4>
                  <div className="flex space-x-4">
                    {memoizedSocialLinks.map((social, index) => (
                      <motion.a
                        key={`social-${social.label}-${index}`}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          rotate: [0, -3, 3, 0],
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`p-4 bg-slate-800/40 backdrop-blur-md rounded-2xl text-gray-400 ${social.hoverColor} transition-all duration-300 group relative overflow-hidden border border-slate-700/30 shadow-md`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        ></div>
                        <social.icon className="w-6 h-6 relative z-10" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  className="bg-gradient-to-br from-slate-800/30 to-slate-900/40 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden border border-slate-700/30 shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="p-3 bg-gradient-to-r from-purple-500 to-purple-500 rounded-xl mr-4 shadow-md"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
                        Send Me a Message
                      </h3>
                    </div>

                    <form
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                      role="form"
                    >
                      <FormField
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        icon={User}
                        delay={0.2}
                        isInView={isInView}
                      />

                      <FormField
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        icon={AtSign}
                        delay={0.3}
                        isInView={isInView}
                      />

                      <FormField
                        type="textarea"
                        name="message"
                        placeholder="Tell me about your project or just say hello!"
                        value={formData.message}
                        onChange={handleInputChange}
                        icon={MessageCircle}
                        delay={0.4}
                        isInView={isInView}
                        rows={5}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ delay: 0.5, ease: "easeOut" }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-700 hover:to-purple-700 text-white rounded-xl h-12 font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group relative overflow-hidden border border-purple-500/30"
                          aria-label={
                            isSubmitting ? "Sending message..." : "Send message"
                          }
                        >
                          <motion.div
                            animate={isSubmitting ? { rotate: 360 } : {}}
                            transition={{
                              duration: 1.5,
                              repeat: isSubmitting ? Infinity : 0,
                              ease: "linear",
                            }}
                            className="flex items-center justify-center"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            ) : (
                              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            )}
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </motion.div>

                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div variants={itemVariants} className="text-center mt-16">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-block bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30 shadow-lg"
              >
                <p className="text-gray-300 text-lg mb-2">
                  Ready to start your next project?
                </p>
                <p className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent font-semibold text-xl">
                  Let&apos;s build something extraordinary together.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
