"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-blue-500 to-purple-600 origin-left"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress


