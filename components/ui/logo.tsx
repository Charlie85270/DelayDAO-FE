import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <Image
        className="rounded-full"
        src="/images/delay2.jpg"
        alt="Delay.af"
        width={28}
        height={28}
      />
    </Link>
  );
}
