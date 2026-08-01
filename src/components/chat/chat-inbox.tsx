"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { relativeDate, cn } from "@/lib/utils";
import { Archive, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import type { ChatThread } from "@/types/database";

export function ChatInbox({
  role,
  initialThreadId,
}: {
  role: "company" | "candidate";
  initialThreadId?: string | null;
}) {
  const store = useRecluStore();
  const threads =
    role === "company"
      ? store.getThreadsForCompany(store.getActiveCompanyId())
      : store.getThreadsForCandidate(DEMO_SESSION.candidateId);

  const [activeId, setActiveId] = useState<string | null>(
    initialThreadId || null
  );
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialThreadId) setActiveId(initialThreadId);
  }, [initialThreadId]);

  useEffect(() => {
    if (!activeId && threads[0]) setActiveId(threads[0].id);
  }, [threads, activeId]);

  const active = useMemo(
    () => threads.find((t) => t.id === activeId) || store.getThread(activeId || ""),
    [threads, activeId, store]
  );

  const messages = store.getMessages(active?.id || "");

  useEffect(() => {
    if (!active) return;
    store.markThreadRead(
      active.id,
      role === "company" ? "company" : "candidate"
    );
  }, [active?.id, messages.length, role, store]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, active?.id]);

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando chat…</p>;
  }

  if (!threads.length) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="Aún no hay conversaciones"
        description={
          role === "company"
            ? "Contacta talento desde el directorio o el inbox de postulaciones para iniciar un chat."
            : "Cuando una empresa te escriba, la conversación aparecerá aquí."
        }
        action={
          role === "company" ? (
            <Link href="/empresa/candidatos">
              <Button>Explorar talento</Button>
            </Link>
          ) : (
            <Link href="/empleos">
              <Button variant="outline">Ver empleos</Button>
            </Link>
          )
        }
      />
    );
  }

  function peerName(t: ChatThread) {
    if (role === "company") {
      return (
        t.candidate_profiles?.profiles?.full_name ||
        t.candidate_profiles?.username ||
        "Candidato"
      );
    }
    return t.companies?.name || "Empresa";
  }

  function unreadOf(t: ChatThread) {
    return role === "company" ? t.company_unread : t.candidate_unread;
  }

  async function send() {
    if (!active || !draft.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 120));
    const res = store.sendChatMessage({
      thread_id: active.id,
      sender_role: role,
      sender_id:
        role === "company"
          ? DEMO_SESSION.companyOwnerId
          : DEMO_SESSION.candidateUserId,
      body: draft,
    });
    setSending(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setDraft("");
  }

  return (
    <div className="flex h-[min(70vh,720px)] overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Thread list */}
      <aside
        className={cn(
          "flex w-full shrink-0 flex-col border-r border-border sm:w-80",
          active ? "hidden sm:flex" : "flex"
        )}
      >
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Mensajes</h2>
          <p className="text-xs text-muted-foreground">
            {threads.length} conversación(es)
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((t) => {
            const unread = unreadOf(t);
            const selected = t.id === active?.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={cn(
                  "flex w-full gap-3 border-b border-border/70 px-4 py-3 text-left transition",
                  selected
                    ? "bg-primary-soft/60"
                    : "hover:bg-slate-50",
                  unread > 0 && !selected && "bg-sky-50/40"
                )}
              >
                <Avatar name={peerName(t)} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {peerName(t)}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {relativeDate(t.last_message_at)}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.subject}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="truncate text-xs text-slate-600">
                      {t.last_message_preview}
                    </p>
                    {unread > 0 && (
                      <Badge className="shrink-0 text-[10px]">{unread}</Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Conversation */}
      <section className="hidden min-w-0 flex-1 flex-col sm:flex">
        {active ? (
          <>
            <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={peerName(active)} size="md" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {peerName(active)}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {active.subject}
                    {active.jobs ? ` · ${active.jobs.title}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {role === "company" && active.candidate_profiles?.username && (
                  <Link href={`/talento/${active.candidate_profiles.username}`}>
                    <Button size="sm" variant="outline">
                      Perfil
                    </Button>
                  </Link>
                )}
                {role === "candidate" && active.companies?.slug && (
                  <Link href={`/empresas/${active.companies.slug}`}>
                    <Button size="sm" variant="outline">
                      Empresa
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    store.archiveThread(active.id, role);
                    setActiveId(null);
                    toast.message("Conversación archivada");
                  }}
                  aria-label="Archivar"
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/50 px-4 py-4">
              {messages.map((m) => {
                const mine = m.sender_role === role;
                const system = m.sender_role === "system";
                if (system) {
                  return (
                    <p
                      key={m.id}
                      className="text-center text-xs text-muted-foreground"
                    >
                      {m.body}
                    </p>
                  );
                }
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex",
                      mine ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                        mine
                          ? "rounded-br-md bg-primary text-white"
                          : "rounded-bl-md border border-border bg-white text-slate-800"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{m.body}</p>
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          mine ? "text-white/70" : "text-muted-foreground"
                        )}
                      >
                        {new Date(m.created_at).toLocaleString("es-MX", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <footer className="border-t border-border bg-white p-3">
              <div className="flex gap-2">
                <Textarea
                  rows={2}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.slice(0, 4000))}
                  placeholder="Escribe un mensaje…"
                  className="min-h-[44px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                />
                <Button
                  className="shrink-0 self-end"
                  disabled={sending || !draft.trim()}
                  onClick={() => void send()}
                >
                  <Send className="h-4 w-4" />
                  Enviar
                </Button>
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">
                Enter envía · Shift+Enter nueva línea · Sé profesional y claro
              </p>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Selecciona una conversación
          </div>
        )}
      </section>

      {/* Mobile: show conversation full when selected */}
      {active && (
        <section className="flex min-w-0 flex-1 flex-col sm:hidden">
          <header className="border-b border-border px-3 py-2">
            <button
              type="button"
              className="text-xs text-primary"
              onClick={() => setActiveId(null)}
            >
              ← Conversaciones
            </button>
            <p className="font-semibold">{peerName(active)}</p>
          </header>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((m) => {
              const mine = m.sender_role === role;
              return (
                <div
                  key={m.id}
                  className={cn("flex", mine ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                      mine
                        ? "bg-primary text-white"
                        : "border border-border bg-white"
                    )}
                  >
                    {m.body}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 border-t p-2">
            <Textarea
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="text-sm"
            />
            <Button size="sm" onClick={() => void send()} disabled={sending}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
