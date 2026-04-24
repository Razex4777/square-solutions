import Image from "next/image";

export function NavLogo() {
  return (
    <div className="flex items-center shrink-0 transition-colors duration-300">
      {/* Dark mode logo (white text) */}
      <Image
        src="/logo.webp"
        alt="Square Solutions Logo"
        width={500}
        height={500}
        className="object-contain h-16 sm:h-20 md:h-28 w-auto hidden dark:block"
        priority
      />
      {/* Light mode logo (black text) */}
      <Image
        src="/logo-dark.webp"
        alt="Square Solutions Logo"
        width={500}
        height={500}
        className="object-contain h-16 sm:h-20 md:h-28 w-auto block dark:hidden"
        priority
      />
    </div>
  );
}
