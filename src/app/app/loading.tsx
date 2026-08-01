export default function AppLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-24 rounded-2xl bg-slate-200/80" />
      <div className="grid gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-200/60" />
        ))}
      </div>
      <div className="h-40 rounded-2xl bg-slate-200/50" />
    </div>
  );
}
