"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Proposal } from "@/types/proposal";
import { formatCurrency, getStatusColor } from "../dao/proposals";

export function HistoryProposals() {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/proposal/${id}`);
  };

  const proposals: Proposal[] = [
    {
      id: 1,
      title: "Proposal 1",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
      status: "pending",
      createdAt: new Date(),
      endDate: new Date(),
      votes: [],
    },
    {
      id: 2,
      title: "Proposal 2",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
      status: "approved",
      createdAt: new Date(),
      endDate: new Date(),
      votes: [],
    },
    {
      id: 3,
      title: "Proposal 3",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
      status: "rejected",
      createdAt: new Date(),
      endDate: new Date(),
      votes: [],
    },
    {
      id: 4,
      title: "Proposal 4",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
      status: "pending",
      createdAt: new Date(),
      endDate: new Date(),
      votes: [],
    },
    {
      id: 5,
      title: "Proposal 5",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
      status: "pending",
      createdAt: new Date(),
      endDate: new Date(),
      votes: [],
    },
  ];

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="max-w-[300px]">Description</TableHead>

            <TableHead>Created At</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="flex justify-end">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow
              key={proposal.id}
              className="hover:bg-muted h-[70px] cursor-pointer"
              onClick={() => handleRowClick(proposal.id)}
            >
              <TableCell className="font-medium">{proposal.title}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {proposal.description}
              </TableCell>

              <TableCell>
                {format(proposal.createdAt, "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{format(proposal.endDate, "MMM dd, yyyy")}</TableCell>
              <TableCell className="ml-auto text-right">
                <Badge className={getStatusColor(proposal.status)}>
                  {proposal.status.charAt(0).toUpperCase() +
                    proposal.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
