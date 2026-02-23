import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Layout, Share2, ShieldCheck, ArrowRight, Activity, Zap, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-background pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-border mb-10 animate-fade-in shadow-sm">
                <Activity className="w-3 h-3" />
                V1.0 Operational
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-8 leading-[1.1]">
                Habit Tracking for <br />
                <span className="text-primary glow-primary">High-Performance</span> <br />
                Developers.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground mb-12 font-medium">
                The minimalist habit architect. Build precision routines for Dev, CS, and DSA. Track every move with a tool designed for builders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/templates/new"
                  className="rounded-xl bg-primary px-10 py-4 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 group uppercase tracking-widest glow-primary"
                >
                  Create Protocol
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-xl px-10 py-4 text-sm font-bold text-foreground bg-secondary border border-border hover:bg-secondary/80 transition-all active:scale-95 uppercase tracking-widest"
                >
                  View Nodes
                </Link>
              </div>

              {/* Mock UI Element */}
              <div className="mt-24 w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl border border-border animate-fade-in">
                <div className="h-10 bg-secondary border-b border-border flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  <div className="flex-1" />
                  <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="p-8 grid grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-8 rounded-lg bg-secondary border border-border flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-sm ${i % 3 === 0 ? 'bg-primary glow-primary' : 'bg-muted/20'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary border-y border-border relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-12">
              {[
                {
                  icon: Zap,
                  title: "Rapid Architecture",
                  desc: "Generate habit protocols in seconds with our optimized template library.",
                },
                {
                  icon: Layout,
                  title: "Fluid Design",
                  desc: "A distraction-free interface built with the precision of your favorite IDE.",
                },
                {
                  icon: Share2,
                  title: "Public Nodes",
                  desc: "Share your consistency nodes with a read-only view link for the world.",
                },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border text-primary group-hover:border-primary transition-all duration-300 mb-6 shadow-sm">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-medium px-4">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-24 relative overflow-hidden border-b border-border">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-8">
              Stay Consistent. Move Faster.
            </h2>
            <Link
              href="/templates/new"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-xs font-bold text-primary-foreground shadow-xl hover:opacity-90 transition-all active:scale-95 uppercase tracking-[0.2em] glow-primary"
            >
              Initialize My Checklist
              <CheckCircle2 className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-bold">
             <div className="w-5 h-5 bg-primary rounded flex items-center justify-center text-[8px] text-primary-foreground">CL</div>
             <span className="text-foreground text-sm tracking-tight">Checklist</span>
          </div>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">© 2026 Checklist. All Nodes Functional.</p>
        </div>
      </footer>
    </div>
  );
}
