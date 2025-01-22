"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Proposals } from "@/components/dao/proposals";

import Overview from "@/components/overview/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentVotes } from "@/components/dao/recent-votes";

import { PlusCircle } from "lucide-react";
import { useRadix } from "../context/useRadix";
import Profile from "@/components/profile/profile";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const { state } = useRadix();

  const isAccountConnected =
    state?.accounts?.length && state?.accounts?.length > 0;

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">DELAY DAO</h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => router.push("/proposal/new")}
              size="default"
              variant="outline"
              className="gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Create a Proposal
            </Button>
          </div>
        </div>
        <Tabs value={tab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="votes">Votes</TabsTrigger>
            <TabsTrigger
              value="profile"
              disabled={Boolean(!isAccountConnected)}
            >
              My profile
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
          <TabsContent value="profile" className="space-y-4">
            <Profile />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
