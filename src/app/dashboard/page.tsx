import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Edit2, Share, Trash2, Layout, Calendar, CheckSquare, PlusCircle, Activity } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const templates = await prisma.template.findMany({
    where: {
      userId: (session.user as any).id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-24">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-border pb-12 relative overflow-hidden">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-border mb-2 animate-fade-in shadow-sm">
              <Activity className="w-3 h-3" />
              Overview
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-6xl">
              Dashboard.
            </h1>
            <p className="text-muted-foreground text-lg font-medium max-w-xl leading-relaxed">
              Monitoring <span className="text-primary font-black underline decoration-primary/30 decoration-4 underline-offset-4 tracking-tighter">{templates.length} Protocol{templates.length !== 1 ? 's' : ''}</span> currently in execution.
            </p>
          </div>
          <Link
            href="/templates/new"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-black text-sm hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all group uppercase tracking-widest glow-primary"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            New Protocol
          </Link>
        </header>

        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-secondary rounded-3xl border border-dashed border-border animate-fade-in group hover:border-primary transition-colors duration-500">
            <div className="bg-background p-8 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500 border border-border shadow-xl">
              <Layout className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">No Active Nodes.</h2>
            <p className="text-muted-foreground text-center max-w-sm mb-12 text-sm font-medium leading-relaxed">
              Initialize your first habit architecture and begin your tracking journey today.
            </p>
            <Link
              href="/templates/new"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-xl font-black text-sm hover:opacity-90 transition-all shadow-xl uppercase tracking-widest glow-primary"
            >
              Start Session
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-card rounded-2xl border border-border hover:border-primary transition-all duration-500 overflow-hidden flex flex-col shadow-xl"
              >
                <div className="p-10 space-y-8 flex-1 relative z-10">
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground bg-secondary px-4 py-1.5 rounded-lg w-fit border border-border">
                         <Calendar className="w-4 h-4 text-primary" />
                         <span className="text-[10px] uppercase tracking-widest font-black">{(template.config as any).days} Days</span>
                      </div>
                    </div>
                    {template.isPublic && (
                      <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest shadow-sm glow-primary">
                        <Share className="w-3 h-3" />
                        Live
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-secondary p-6 rounded-2xl flex flex-col items-center justify-center border border-border group-hover:border-primary/20 transition-all duration-500">
                      <span className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                        {(template.config as any).columns.length}
                      </span>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Nodes</span>
                    </div>
                    <div className="bg-secondary p-6 rounded-2xl flex flex-col items-center justify-center border border-border group-hover:border-primary/20 transition-all duration-500">
                      <span className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                        <CheckSquare className="w-7 h-7" />
                      </span>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Active</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary border-t border-border flex items-center justify-between group-hover:bg-primary/5 transition-all duration-500 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/templates/edit/${template.id}`}
                      className="p-3 text-muted-foreground hover:text-primary hover:bg-background rounded-xl transition-all shadow-sm border border-transparent hover:border-border active:scale-95"
                      title="Edit Protocol"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Link>
                    {template.isPublic && (
                      <Link
                        href={`/t/${template.shareToken}`}
                        className="p-3 text-muted-foreground hover:text-primary hover:bg-background rounded-xl transition-all shadow-sm border border-transparent hover:border-border active:scale-95"
                        title="View Public Share"
                      >
                        <Share className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                  <button
                    className="p-3 text-muted-foreground hover:text-destructive hover:bg-background rounded-xl transition-all shadow-sm border border-transparent hover:border-border active:scale-95"
                    title="Terminate"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
