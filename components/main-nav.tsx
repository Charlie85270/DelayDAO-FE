import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { label: "Delay DAO", href: "/" },
  { label: "FAQ", href: "faq" },
  { label: "How it works", href: "how-it-works" },
  { label: "Contact", href: "contact" },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            link.href === pathname ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
