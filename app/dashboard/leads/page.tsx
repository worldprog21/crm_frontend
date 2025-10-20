"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLeads } from "@/hooks/useLeads";

export default function Page() {
  const { leadsQuery, createLead, updateLead, deleteLead } = useLeads();

  return (
    <div className="space-y-4 p-6">
      <h1 className="font-bold text-2xl">Leads Dashboard</h1>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Leads</h2>

        <Button
          disabled={createLead.isPending}
          onClick={() => createLead.mutate()}
        >
          {createLead.isPending ? "Creating..." : "Create Lead"}
        </Button>
      </div>

      {leadsQuery.isLoading ? (
        <p>Loading leads...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leadsQuery.data?.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    onClick={() => updateLead.mutate(lead)}
                    size="sm"
                    variant="outline"
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => deleteLead.mutate(lead.id)}
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
