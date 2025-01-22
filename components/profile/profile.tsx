"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

import { useState } from "react";
import { Separator } from "../ui/separator";
import { ProfileForm } from "./profile-form";
import { HistoryVotes } from "./history-votes";
import { HistoryProposals } from "./history-proposals";
import { Admin } from "./admin";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "profile",
  },
  {
    title: "My votes history",
    href: "votes",
  },
  {
    title: "My proposals history",
    href: "proposals",
  },
  {
    title: "Admin",
    href: "admin",
  },
];

export default function Profile() {
  const [tab, setTab] = useState("profile");

  // To be determined with onChain data
  const isAdmin = true;

  return (
    <>
      <Separator className="my-6" />
      <div className="space-y-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">My profile</h2>
          <p className="text-muted-foreground">
            Manage your dao profile, votes, and more.
          </p>
        </div>

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <nav
              className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
              )}
            >
              {sidebarNavItems.map((item) => (
                <Button
                  variant="ghost"
                  onClick={() => setTab(item.href)}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    tab === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start"
                  )}
                >
                  {item.title}
                </Button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {tab === "profile" && <ProfileForm />}
            {tab === "votes" && <HistoryVotes />}
            {tab === "proposals" && <HistoryProposals />}
            {tab === "admin" && isAdmin && <Admin />}
          </div>
        </div>
      </div>
    </>
  );
}
