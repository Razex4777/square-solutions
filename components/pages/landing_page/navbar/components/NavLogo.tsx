import Image from "next/image";

export function NavLogo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.webp"
        alt="Square Solutions Logo"
        width={400}
        height={130}
        className="object-contain h-20 md:h-24 w-auto bg-transparent"
        priority
      />
    </div>
  );
}
