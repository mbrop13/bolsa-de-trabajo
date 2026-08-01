import { DemoBanner } from "@/components/layout/demo-banner";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hero">
      <DemoBanner />
      <div className="container-page flex min-h-[calc(100vh-40px)] flex-col items-center justify-center py-10">
        <Logo showTagline className="mb-8" />
        <div className="w-full max-w-md">{children}</div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
