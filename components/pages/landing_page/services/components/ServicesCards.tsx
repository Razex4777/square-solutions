import { MonitorSmartphone, PhoneCall, Bot, CloudCog, Globe, Megaphone } from 'lucide-react';

export function ServicesCards() {
  const services = [
    {
      icon: <MonitorSmartphone className="w-5 h-5 text-[#2dc5f4]" />,
      title: "Software Applications & Solutions",
      description: "We Design And Develop Smart, Scalable Software Solutions And Web Applications Tailored To Your Business Needs.",
      highlight: false,
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-[#2dc5f4]" />,
      title: "Consulting Services",
      description: "We Support Businesses At Early And Growth Stages By Providing Expert Consultancy. Our Guidance Focuses On Identifying Fair, Effective, And Purpose-Driven Digital Solutions.",
      highlight: false,
    },
    {
      icon: <Bot className="w-5 h-5 text-[#2dc5f4]" />,
      title: "IT Managed Services",
      description: "Our IT Managed Services Implement Standardized Best Practices To Streamline Your Operations. From System Design To Ongoing Support, We Build Secure, Efficient IT Service Environments",
      highlight: false,
    },
    {
      icon: <CloudCog className="w-5 h-5 text-[#2dc5f4]" />,
      title: "Digital Workplace & Infrastructure",
      description: "Rethink The Digital Workplace By Building Flexible Infrastructures That Support Modern Workstyles. Our Solutions Are Designed To Enhance Collaboration, Productivity.",
      highlight: true, // This one has the colored border in the screenshot
    },
    {
      icon: <Globe className="w-5 h-5 text-[#2dc5f4]" />,
      title: "Digital Marketing",
      description: "We Develop Data-Driven Digital Marketing Strategies That Increase Brand Visibility, Attract Qualified Leads, And Drive Customer Engagement. From SEO To Paid Campaigns.",
      highlight: false,
    },
    {
      icon: <Megaphone className="w-5 h-5 text-[#2dc5f4]" />,
      title: "Social Media Management",
      description: "Our Social Media Management Services Create A Cohesive Brand Presence Across Platforms. We Handle Content Planning, Publishing, Engagement, And Analytics To Build Meaningful.",
      highlight: false,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
      {services.map((service, idx) => (
        <div 
          key={idx}
          className={`group relative rounded-2xl p-8 lg:p-12 flex flex-col bg-[#0c121e] border transition-all duration-300 overflow-hidden ${
            service.highlight 
              ? 'border-[#12e399]/50 shadow-[inset_0_0_80px_rgba(18,227,153,0.05)]' 
              : 'border-white/[0.08] hover:border-white/[0.15] shadow-[inset_0_0_80px_rgba(45,197,244,0.02)]'
          }`}
        >
          {/* Glowing inner effect covering the bottom/center area */}
          <div className={`absolute inset-0 opacity-40 transition-opacity duration-300 pointer-events-none ${
            service.highlight 
              ? 'bg-[radial-gradient(circle_at_center,rgba(18,227,153,0.12),transparent_70%)]' 
              : 'bg-[radial-gradient(circle_at_center,rgba(45,197,244,0.06),transparent_80%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(45,197,244,0.1),transparent_80%)]'
          }`} />

          {/* Inner top glow for highlighted card specifically */}
          {service.highlight && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[radial-gradient(ellipse_at_top,rgba(45,197,244,0.15)_0%,transparent_70%)] pointer-events-none" />
          )}

          {/* Icon Box */}
          <div className="relative z-10 w-14 h-14 rounded-xl bg-[#112031] flex items-center justify-center mb-8 self-start shrink-0 shadow-[0_0_20px_rgba(45,197,244,0.08)]">
            {service.icon}
          </div>

          <h3 className="relative z-10 text-2xl font-bold text-white mb-4">
            {service.title}
          </h3>

          <p className="relative z-10 text-[#9ba8b8] text-[15px] lg:text-base leading-relaxed">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}
