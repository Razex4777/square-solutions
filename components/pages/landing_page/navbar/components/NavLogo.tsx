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
        className="object-contain h-10 sm:h-12 md:h-14 w-auto hidden dark:block"
        priority
      />
      {/* Light mode logo (black text) */}
      <Image
        src="/logo-dark.webp"
        alt="Square Solutions Logo"
        width={500}
        height={500}
        className="object-contain h-10 sm:h-12 md:h-14 w-auto block dark:hidden"
        priority
      />
    </div>
  );
}
