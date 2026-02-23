import Navbar from "@/components/Navbar";
import { BookOpen, Zap, Shield, Share2, Terminal, Code, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const sections = [
    {
      title: "The Vision",
      icon: Zap,
      content: "Checklist is a precision habit architect designed for high-performance developers. It moves away from bloated productivity tools to provide a focused, IDE-inspired environment for tracking Dev, CS, and DSA consistency."
    },
    {
      title: "Protocol Architecture",
      icon: Terminal,
      content: "Each habit tracker is a 'Protocol'. You can initialize a protocol from our library of presets (Standard, Deep Work, Interview Grind) or architect a custom node structure from scratch."
    },
    {
      title: "Time-Based Deployment",
      icon: Activity,
      content: "Protocols are time-bound. By setting a Deployment Date, the system automatically maps your habits to real-world dates, allowing for precise tracking and accountability."
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      content: "Your data is your own. By default, all protocols are private. We utilize industry-standard encryption and secure OAuth providers (GitHub/Google) to ensure your tracking data remains secure."
    },
    {
      title: "Public Share Nodes",
      icon: Share2,
      content: "Transparency breeds consistency. Every protocol can be 'Published' to generate a unique, read-only public link. Perfect for sharing your journey on Twitter, LinkedIn, or within your dev community."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16 animate-fade-in">
        <header className="mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20">
            <BookOpen className="w-3 h-3" />
            Documentation
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">System Overview.</h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            Everything you need to know about architecting your consistency with Checklist.
          </p>
        </header>

        <div className="space-y-16">
          {sections.map((section, i) => (
            <section key={i} className="group flex gap-8">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary group-hover:border-primary/50 transition-all duration-300">
                  <section.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">{section.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-24 p-8 bg-card border border-border rounded-2xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
            <Code className="w-4 h-4" />
            Technical Stack
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Next.js 15", "Prisma 7", "PostgreSQL", "Tailwind 4", "Auth.js", "TypeScript"].map((tech) => (
              <div key={tech} className="bg-secondary/50 px-3 py-2 rounded-lg border border-border/50 text-[10px] font-bold text-center">
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/templates/new"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:opacity-80 transition-all group"
          >
            Architect Your First Protocol
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </div>
  );
}
