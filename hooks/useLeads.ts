import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { LeadFormValues } from "@/lib/lead-schema";
import type { Lead } from "@/types/lead";

export function useLeads() {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await api.get("/leads");
      return res.data;
    },
  });

  const createLead = useMutation({
    mutationFn: async (data: LeadFormValues) => await api.post("/leads", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: LeadFormValues }) =>
      await api.put(`/leads/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => await api.delete(`/leads/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  return { leadsQuery, createLead, updateLead, deleteLead };
}
