import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  status: z.enum(["New", "Contacted", "Qualified", "Disqualified"]),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
