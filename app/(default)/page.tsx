"use client";

import { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Proposals } from "@/components/dao/proposals";

import Overview from "@/components/overview/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentVotes } from "@/components/dao/recent-votes";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  CreateProposalDialog,
  ProposalFormValues,
} from "@/components/dialog/create-proposal-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const [isOpenCreateProposal, setIsOpenCreateProposal] = useState(false);
  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };
  const handleSubmitCreateProposal = (proposal?: ProposalFormValues) => {
    console.log(proposal);
  };

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">DELAY DAO</h2>
          <div className="flex items-center space-x-2">
            <Dialog
              open={isOpenCreateProposal}
              onOpenChange={setIsOpenCreateProposal}
            >
              <CreateProposalDialog onSubmit={handleSubmitCreateProposal} />

              <DialogTrigger asChild>
                <Button size="default" variant="outline" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" /> Create a Proposal
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
        <Tabs value={tab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="votes">Votes</TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Overview />
          </TabsContent>
          <TabsContent value="proposals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <Proposals />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="votes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentVotes />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
