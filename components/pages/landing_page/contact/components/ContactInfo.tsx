import { Mail, Facebook, Linkedin } from 'lucide-react';

export function ContactInfo() {
  const infoCards = [
    {
      icon: <Mail className="w-5 h-5 text-[#2dc5f4]" />,
      label: "Email",
      value: "Info@Sq-Solution.Com",
      isLink: false,
      highlight: false,
    },
    {
      icon: <Facebook className="w-5 h-5 text-[#2dc5f4]" />,
      label: "Facebook",
      value: "Square Solutions",
      isLink: true,
      highlight: true, // Has the cyan border in screenshot
    },
    {
      icon: <Linkedin className="w-5 h-5 text-[#2dc5f4]" />,
      label: "Linkedin",
      value: "Square Solutions",
      isLink: true,
      highlight: false,
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {infoCards.map((card, idx) => (
        <div 
          key={idx}
          className={`flex items-center p-6 rounded-2xl bg-[#0c121e] border transition-colors ${
            card.highlight
              ? 'border-[#2dc5f4]/60 shadow-[inset_0_0_20px_rgba(45,197,244,0.05)]'
              : 'border-white/[0.08] hover:border-white/[0.15]'
          }`}
        >
          {/* Icon Box */}
          <div className="w-12 h-12 rounded-lg bg-[#112031] flex items-center justify-center shrink-0 mr-6">
            {card.icon}
          </div>

          {/* Text Container */}
          <div className="flex flex-col">
            <span className="text-xs text-[#9ba8b8] mb-1">{card.label}</span>
            {card.isLink ? (
              <a href="#" className="text-[#f8fafc] font-medium text-[15px] underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
                {card.value}
              </a>
            ) : (
              <span className="text-[#f8fafc] font-medium text-[15px]">{card.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
