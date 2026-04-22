import { MapPin } from 'lucide-react';

export function AboutCards() {
  const cards = [
    {
      title: "Our Mission",
      description: "To Be A Trusted, All-In-One Solutions Provider That Transforms Innovative Ideas And Business Models Into Impactful Digital And Cloud-Based Solutions. We Aim To Align Every Project With Cutting-Edge Technologies And Our Clients' Success, Enabling Sustainable Growth Through Digital Transformation.",
      highlight: false
    },
    {
      title: "Our Vision",
      description: "To Be A Catalyst For Innovation By Delivering Tailored Digital Solutions That Empower Emerging Businesses To Succeed In Today's Competitive Landscape. We Are Dedicated To Making High-Quality, Custom-Built Applications Accessible To All—Regardless Of Budget—By Turning Unique Ideas Into Powerful, Results-Driven Digital Experiences.",
      highlight: true
    },
    {
      title: "Our Values",
      description: "Our Commitment To Quality, Ethics, And Collaboration Defines Us. We Build Digital Solutions With Purpose And People In Mind.",
      highlight: false
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className="group relative rounded-2xl p-8 lg:p-12 flex flex-col bg-[#0c121e] border border-white/[0.08] transition-all duration-300 overflow-hidden shadow-[inset_0_0_80px_rgba(45,197,244,0.02)]"
        >
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,197,244,0.03),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(45,197,244,0.06),transparent_70%)] transition-colors duration-300 pointer-events-none" />
          
          {card.highlight && (
            <div className="absolute top-[-1px] left-[-1px] right-[-1px] h-[3px] bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-t-2xl z-10 box-content" />
          )}

          {/* Icon Positioned Top Left (LTR) */}
          <div className="w-12 h-12 rounded-lg bg-[#112031] flex items-center justify-center mb-8 self-start">
            <MapPin className="w-5 h-5 text-[#2dc5f4]" />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4">
            {card.title}
          </h3>

          <p className="text-slate-400/90 text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
            {card.description}
          </p>
          
          {/* Subtle glow for the highlighted card */}
          {card.highlight && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[60%] h-20 bg-[#2dc5f4]/10 blur-[40px] pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
}
