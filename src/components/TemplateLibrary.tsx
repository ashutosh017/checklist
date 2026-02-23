"use client";

import { Layout, Code, BookOpen, Brain, Zap, CheckCircle2 } from "lucide-react";

const PRESET_TEMPLATES = [
  {
    id: "standard",
    name: "Standard Developer",
    description: "The balanced routine for career growth and skill mastery.",
    icon: Code,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    columns: [
      { id: "col-1", name: "Dev (4hrs)" },
      { id: "col-2", name: "CS (2hrs)" },
      { id: "col-3", name: "DSA (2hrs)" },
    ],
    days: 30,
  },
  {
    id: "deep-work",
    name: "Deep Work Protocol",
    description: "Maximum focus on high-impact coding and architecture.",
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    columns: [
      { id: "col-1", name: "Deep Work (4hrs)" },
      { id: "col-2", name: "Learning" },
      { id: "col-3", name: "Open Source" },
      { id: "col-4", name: "Review" },
    ],
    days: 21,
  },
  {
    id: "interview-prep",
    name: "Interview Grind",
    description: "Intensive focus on DSA, System Design, and CS Fundamentals.",
    icon: Brain,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    columns: [
      { id: "col-1", name: "DSA (Easy/Med)" },
      { id: "col-2", name: "DSA (Hard)" },
      { id: "col-3", name: "System Design" },
      { id: "col-4", name: "Mock Interview" },
    ],
    days: 14,
  },
  {
    id: "minimalist",
    name: "The Minimalist",
    description: "Keep it simple. One core habit and a reflection.",
    icon: BookOpen,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    columns: [
      { id: "col-1", name: "Core Habit" },
      { id: "col-2", name: "Daily Journal" },
    ],
    days: 60,
  }
];

interface TemplateLibraryProps {
  onSelect: (template: any) => void;
}

export default function TemplateLibrary({ onSelect }: TemplateLibraryProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Choose a Template
        </h1>
        <p className="text-muted-foreground text-lg font-medium leading-relaxed">
          Select a starting point for your journey. You can fully customize every detail in the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRESET_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="group relative flex flex-col text-left bg-card rounded-2xl border border-border p-6 hover:border-primary hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            <div className={`w-12 h-12 rounded-xl ${template.bg} ${template.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <template.icon className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {template.name}
            </h3>
            
            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 flex-1">
              {template.description}
            </p>

            <div className="space-y-2 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Duration</span>
                <span className="text-foreground">{template.days} Days</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Columns</span>
                <span className="text-foreground">{template.columns.length}</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={() => onSelect({ name: "Custom Protocol", columns: [], days: 30 })}
          className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
        >
          <Layout className="w-4 h-4" />
          Start with a blank canvas
        </button>
      </div>
    </div>
  );
}
