"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatInbox } from "@/components/chat/chat-inbox";

function CompanyChat() {
  const params = useSearchParams();
  const thread = params.get("thread");
  return <ChatInbox role="company" initialThreadId={thread} />;
}

export default function MensajesEmpresaPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">Chat con talento</h2>
        <p className="text-sm text-muted-foreground">
          Conversaciones multi-mensaje con candidatos. Inicia un chat desde
          Talento o Postulaciones.
        </p>
      </div>
      <Suspense fallback={<p className="text-muted-foreground">Cargando…</p>}>
        <CompanyChat />
      </Suspense>
    </div>
  );
}
