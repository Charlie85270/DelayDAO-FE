"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProposalDetails() {
  const { id } = useParams();
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Proposal ID: {id}</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Link href={`/?tab=proposals`}>Back to Proposals</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
