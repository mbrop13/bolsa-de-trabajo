import { demoProfiles, demoCandidates } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-3 pb-20 lg:pb-0">
      {demoProfiles.map((p) => {
        const cand = demoCandidates.find((c) => c.user_id === p.id);
        return (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-white px-5 py-4 shadow-sm"
          >
            <div>
              <p className="font-medium">{p.full_name}</p>
              <p className="text-sm text-muted-foreground">{p.email}</p>
              {cand?.username && (
                <p className="text-xs text-primary">@{cand.username}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{p.role}</Badge>
              <Badge variant={p.is_active ? "success" : "danger"}>
                {p.is_active ? "activo" : "inactivo"}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
