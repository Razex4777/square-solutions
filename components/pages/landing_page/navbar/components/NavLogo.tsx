import Image from "next/image";

export function NavLogo() {
  return (
    <div className="flex items-center shrink-0 rounded-xl px-2 py-1 bg-[#0A0D14] dark:bg-transparent transition-colors duration-300">
      <Image
        src="/logo.webp"
        alt="Square Solutions Logo"
        width={500}
        height={500}
        className="object-contain h-10 sm:h-12 md:h-14 w-auto"
        priority
      />
    </div>
  );
}
