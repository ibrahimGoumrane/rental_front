import React from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { motion } from 'framer-motion';
export function MessagesPage() {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.4
  }} className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto pt-8 px-0 md:px-6 h-full">
        <ChatInterface />
      </div>
    </motion.div>;
}