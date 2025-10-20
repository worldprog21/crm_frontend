import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
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

  const createLead = useMutation<Lead>({
    mutationFn: async () =>
      await api.post("/leads", {
        name: "New Lead",
        email: "new.lead@example.com",
        phone: "+1 202-555-0100",
        status: "New",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  const updateLead = useMutation({
    mutationFn: async (lead: Lead) =>
      await api.put(`/leads/${lead.id}`, {
        ...lead,
        status: "Qualified",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => await api.delete(`/leads/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  return { leadsQuery, createLead, updateLead, deleteLead };
}
