import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Share2, Layout, User, Calendar } from "lucide-react";

export default async function PublicTemplatePage({ params }: any) {
  const { token } = await params;

  const template = await prisma.template.findUnique({
    where: {
      shareToken: token,
      isPublic: true,
    },
    include: {
      user: true,
    },
  });

  if (!template) {
    notFound();
  }

  const config = template.config as any;
  const data = template.data as any;
  
  // Safely handle startDate
  const rawStartDate = template.startDate ? new Date(template.startDate) : new Date();
  const startDate = isNaN(rawStartDate.getTime()) ? new Date() : rawStartDate;

  const getDateForDay = (dayIndex: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    try {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return "N/A";
    }
  };

  const formattedStartDate = (() => {
    try {
      return startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return "Unknown Date";
    }
  })();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-24">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-2xl shadow-lg border border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Layout className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Public Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {template.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary/60" />
                BY <span className="text-foreground font-bold">{template.user.name}</span>
              </div>
              <div className="hidden sm:block text-border">|</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/60" />
                START <span className="text-foreground font-bold">{formattedStartDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg glow-primary">
            <Share2 className="w-3.5 h-3.5" />
            Live View
          </div>
        </header>

        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="overflow-x-auto relative">
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-secondary border-b border-border sticky top-0 z-20">
                  <th className="p-3 sm:p-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-r border-border w-24 sm:w-32 bg-secondary sticky left-0 z-30">
                    Day / Date
                  </th>
                  {config.columns.map((col: any) => (
                    <th key={col.id} className="p-3 sm:p-4 min-w-[140px] border-r border-border last:border-r-0">
                      <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{col.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: config.days }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors">
                    <td className="p-3 sm:p-4 border-r border-border bg-secondary/10 sticky left-0 z-10 backdrop-blur-sm">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Day {i + 1}</span>
                        <span className="text-[10px] font-bold text-foreground/70">{getDateForDay(i)}</span>
                      </div>
                    </td>
                    {config.columns.map((col: any) => (
                      <td key={col.id} className="p-3 sm:p-4 text-center border-r border-border last:border-r-0">
                        <div className={`w-7 h-7 mx-auto rounded-lg border-2 flex items-center justify-center transition-all ${
                          data[`day-${i + 1}`]?.[col.id] 
                            ? "bg-primary border-primary shadow-md glow-primary" 
                            : "bg-background border-border"
                        }`}>
                          {data[`day-${i + 1}`]?.[col.id] && (
                            <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
