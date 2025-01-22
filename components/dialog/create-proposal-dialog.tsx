"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { Proposal } from "../dao/proposals";
import { Textarea } from "../ui/textarea";

interface CreateProposalDialogProps {
  proposal?: Proposal;
  isEdit?: boolean;
  onSubmit: (proposal?: ProposalFormValues) => void;
}

const proposalSchema = z.object({
  title: z.string().min(1, {
    message: "Title is mandatory",
  }),
  description: z.string().min(1, {
    message: "Description is mandatory",
  }),
});

export type ProposalFormValues = z.infer<typeof proposalSchema>;

export const LS_ADDRESS_BOOK = "LS_ADDRESS_BOOK";

export function CreateProposalDialog({
  proposal,
  onSubmit,
  isEdit,
}: CreateProposalDialogProps) {
  const [error, setError] = useState("");

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    values: {
      title: proposal?.title || "",
      description: proposal?.description || "",
    },
    mode: "all",
  });

  function onSubmitButton(data: ProposalFormValues) {
    onSubmit(data);
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitButton)}
          className="space-y-2"
        >
          <DialogHeader className="mb-4">
            <DialogTitle>Create a Proposal</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-1">
                <p>Create your proposal with the maximum details possible.</p>
                {error && <p className="text text-red-500"> {error}</p>}
              </div>
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="pt-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button className="mt-4" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
