import { Vote } from "./vote";

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
