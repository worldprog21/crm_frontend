export type LeadStatus = "New" | "Contacted" | "Qualified" | "Disqualified";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  createdAt?: string;
  updatedAt?: string;
};
