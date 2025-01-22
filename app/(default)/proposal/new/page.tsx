"use client";

import { ProposalForm } from "@/components/dao/proposal-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewProposalPage() {
  return (
    <>
      <div className="space-y-0.5 flex flex-col justify-center items-center">
        <h2 className="text-2xl  font-bold tracking-tight">
          Create a Proposal
        </h2>
        <p className="text-muted-foreground">
          Create a new proposal to be voted on by the community.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 justify-center items-center lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <ProposalForm />
        </div>
      </div>
    </>
  );
}
