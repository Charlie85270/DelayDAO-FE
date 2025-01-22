"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";
import { MainNav } from "@/components/main-nav";
import { ConnectButton } from "@/components/connect";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <main className="grow">
        <div className="flex-col flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <ConnectButton />
              </div>
            </div>
          </div>
          <div className="p-8 pt-6">{children}</div>
        </div>
      </main>

      <Footer border={true} />
    </>
  );
}
