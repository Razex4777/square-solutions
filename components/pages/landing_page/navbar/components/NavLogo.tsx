import Image from "next/image";

export function NavLogo() {
  return (
    <div className="flex items-center shrink-0">
      <Image
        src="/logo.webp"
        alt="Square Solutions Logo"
        width={400}
        height={130}
        className="object-contain h-10 sm:h-12 md:h-16 w-auto bg-transparent"
        priority
      />
    </div>
  );
}
