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

interface Vote {
  id: number;
  account: string;
  vote: "for" | "against";
  amount: number;
}

export interface Proposal {
  id: number;
  title: string;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  endDate: Date;
  votes: Vote[];
}

const getStatusColor = (status: Proposal["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-600/70 text-white hover:bg-green-500";
    case "rejected":
      return "bg-red-600/70 text-white hover:bg-red-500";
    default:
      return "bg-blue-600/70 text-white hover:bg-blue-500";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function Proposals() {
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
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="max-w-[300px]">Description</TableHead>
            <TableHead>Amount</TableHead>

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
              <TableCell>{proposal.id}</TableCell>
              <TableCell className="font-medium">{proposal.title}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {proposal.description}
              </TableCell>
              <TableCell>{formatCurrency(proposal.amount)}</TableCell>

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
