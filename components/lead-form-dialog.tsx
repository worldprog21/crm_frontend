"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeads } from "@/hooks/useLeads";
import { type LeadFormValues, leadSchema } from "@/lib/lead-schema";
import type { Lead } from "@/types/lead";

export default function LeadFromDialog({ lead }: { lead?: Lead }) {
  const [open, setOpen] = useState(false);
  const { createLead, updateLead } = useLeads();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: lead?.name ?? "",
      email: lead?.email ?? "",
      phone: lead?.phone ?? "",
      status: lead?.status ?? "New",
    },
  });

  const onSubmit = (data: LeadFormValues) => {
    if (lead) {
      updateLead.mutate(
        { id: lead.id, data },
        { onSuccess: () => setOpen(false) }
      );
    } else {
      createLead.mutate(data, { onSuccess: () => setOpen(false) });
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={lead ? "outline" : "default"}>
          {lead ? "Edit Lead" : "Create Lead"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lead ? "Update Lead" : "Create Lead"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" {...register("name")} />
              <FieldDescription
                className={errors.name ? "text-destructive" : ""}
              >
                {errors.name?.message ?? "Full name of the lead."}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" {...register("email")} />
              <FieldDescription
                className={errors.email ? "text-destructive" : ""}
              >
                {errors.email?.message ?? "We’ll use this to contact the lead."}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" {...register("phone")} />
              <FieldDescription
                className={errors.phone ? "text-destructive" : ""}
              >
                {errors.phone?.message ?? "Include country code if applicable."}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                defaultValue={lead?.status ?? "New"}
                onValueChange={(value) =>
                  setValue("status", value as LeadFormValues["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Disqualified">Disqualified</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription
                className={errors.status ? "text-destructive" : ""}
              >
                {errors.status?.message ?? "Lead status in your pipeline."}
              </FieldDescription>
            </Field>

            <DialogFooter>
              <Button
                disabled={createLead.isPending || updateLead.isPending}
                type="submit"
              >
                {createLead.isPending || updateLead.isPending
                  ? "Saving..."
                  : lead
                  ? "Update"
                  : "Create"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
