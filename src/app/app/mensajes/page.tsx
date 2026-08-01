"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatInbox } from "@/components/chat/chat-inbox";

function CandidateChat() {
  const params = useSearchParams();
  const thread = params.get("thread");
  return <ChatInbox role="candidate" initialThreadId={thread} />;
}

export default function MensajesCandidatoPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">Chat</h2>
        <p className="text-sm text-muted-foreground">
          Conversaciones con empresas verificadas. Responde en tiempo real en
          esta sesión.
        </p>
      </div>
      <Suspense fallback={<p className="text-muted-foreground">Cargando…</p>}>
        <CandidateChat />
      </Suspense>
    </div>
  );
}
