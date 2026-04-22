"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
  return (
    <div 
      className={`flex flex-col border rounded-xl overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-[#2dc5f4]/30 bg-[#0c121e]" : "border-white/[0.08] bg-[#0c121e] hover:border-white/[0.15]"
      }`}
    >
      <button 
        type="button"
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left"
      >
        <span className="text-white font-medium text-base">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#2dc5f4] shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#2dc5f4] shrink-0 ml-4" />
        )}
      </button>

      {/* Answer content */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2">
            <div className="w-full h-[1px] bg-white/[0.05] mb-6" />
            <p className="text-slate-400 text-[15px] leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      question: "Do You Follow A Specific Methodology For Project Development",
      answer: "Yes, We Adopt An Agile Methodology To Guarantee On-Time Delivery, Adaptability To Changes, And Maximum Customer Satisfaction."
    },
    {
      question: "What Core Services Does Square Solution Provide",
      answer: "We offer end-to-end digital solutions including custom software development, digital marketing, IT managed services, cloud infrastructure, and consulting to transform your business operations."
    },
    {
      question: "Can You Help Startups With Limited Budgets",
      answer: "Absolutely. We work closely with startups to prioritize essential features, outline MVP strategies, and deliver cost-effective solutions without compromising on quality."
    },
    {
      question: "How Do You Support Established Brands In Their Digital Journey",
      answer: "We provide scalable enterprise-grade architectures, system integrations, workflow automations, and targeted marketing campaigns to help establish brands reach new milestones."
    },
    {
      question: "How Can I Start A Project With You",
      answer: "You can use our 'Book Your Free Consultation' form or directly email us. We will schedule an initial meeting to discuss your goals, analyze requirements, and create a roadmap."
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {faqs.map((faq, idx) => (
        <FaqItem 
          key={idx} 
          question={faq.question} 
          answer={faq.answer} 
          isOpen={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
        />
      ))}
    </div>
  );
}
