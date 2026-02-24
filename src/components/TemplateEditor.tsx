"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Globe,
  Lock,
  ChevronLeft,
  Layout,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Column {
  name: string;
  id: string;
}

interface TemplateEditorProps {
  initialData?: any;
}

export default function TemplateEditor({ initialData }: TemplateEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(
    initialData?.name || "New Protocol Architect",
  );
  const [columns, setColumns] = useState<Column[]>(
    initialData?.config?.columns || [
      { id: "col-1", name: "Dev (4hrs)" },
      { id: "col-2", name: "CS (2hrs)" },
      { id: "col-3", name: "DSA (2hrs)" },
    ],
  );
  const [days, setDays] = useState(initialData?.config?.days || 30);
  const [startDate, setStartDate] = useState(
    initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [data, setData] = useState<Record<string, Record<string, boolean>>>(
    initialData?.data || {},
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

  const toggleCheckbox = (day: number, colId: string) => {
    const dayKey = `day-${day}`;
    setData((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [colId]: !prev[dayKey]?.[colId],
      },
    }));
  };

  const addColumn = () => {
    const newId = `col-${Date.now()}`;
    setColumns([...columns, { id: newId, name: "New Habit" }]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const updateColumnName = (id: string, newName: string) => {
    setColumns(
      columns.map((col) => (col.id === id ? { ...col, name: newName } : col)),
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/templates", {
        method: initialData?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initialData?.id,
          name,
          config: { columns, days },
          data,
          isPublic,
          startDate: new Date(startDate).toISOString(),
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getDateForDay = (dayIndex: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      {!initialData?.id ? (
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em] group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Protocol Selection
        </button>
      ) : (
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em] group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Dashboard
        </Link>
      )}

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 sm:gap-8 bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-xl">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Editor Mode
            </span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl sm:text-3xl font-bold bg-transparent border-none focus:ring-0 w-full text-foreground placeholder-muted-foreground/30 p-0 leading-tight tracking-tight"
            placeholder="Protocol Name..."
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              isPublic
                ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                : "bg-secondary text-muted-foreground border border-border"
            }`}
          >
            {isPublic ? (
              <Globe className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            {isPublic ? "Public" : "Private"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 glow-primary"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Syncing..." : "Save"}
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-secondary">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-4">
              <div className="bg-background p-2 sm:p-2.5 rounded-xl border border-border text-primary">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">
                  Deployment
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border-none p-0 text-xs font-bold text-foreground focus:ring-0 w-32 cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-0.5 border-l-0 sm:border-l border-border pl-0 sm:pl-10">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">
                Duration
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="bg-transparent border-none p-0 text-base sm:text-lg font-bold text-foreground focus:ring-0 w-12"
                  min="1"
                  max="100"
                />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Days
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={addColumn}
            className="flex items-center justify-center gap-2 text-[10px] font-black text-primary hover:bg-background bg-background px-6 py-2.5 rounded-xl transition-all border border-border uppercase tracking-[0.2em] shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Append Habit
          </button>
        </div>

        <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-secondary border-b border-border sticky top-0 z-20">
                <th className="p-3 sm:p-5 text-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] border-r border-border w-24 sm:w-32 bg-secondary sticky left-0 z-30">
                  Day
                </th>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className="p-3 sm:p-5 min-w-[140px] sm:min-w-[180px] relative group border-r border-border last:border-r-0"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                      <input
                        type="text"
                        value={col.name}
                        onChange={(e) =>
                          updateColumnName(col.id, e.target.value)
                        }
                        className="bg-transparent border-none focus:ring-0 text-[10px] sm:text-xs font-bold text-foreground w-full p-0 placeholder-muted-foreground/30 uppercase tracking-widest text-center"
                        placeholder="HABIT"
                      />
                      <button
                        onClick={() => removeColumn(col.id)}
                        className="text-muted-foreground hover:text-destructive transition-all p-1 rounded-lg hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: days }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors"
                >
                  <td className="p-3 sm:p-5 border-r border-border bg-secondary/20 sticky left-0 z-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                      <span className="text-[8px] sm:text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        Day {i + 1}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-foreground/70">
                        {getDateForDay(i)}
                      </span>
                    </div>
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className="p-3 sm:p-5 text-center border-r border-border last:border-r-0"
                    >
                      <div
                        onClick={() => toggleCheckbox(i + 1, col.id)}
                        className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-lg sm:rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-90 shadow-sm ${
                          data[`day-${i + 1}`]?.[col.id]
                            ? "bg-primary border-primary glow-primary"
                            : "bg-background border-border hover:border-primary/40"
                        }`}
                      >
                        {data[`day-${i + 1}`]?.[col.id] && (
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 sm:p-6 bg-secondary border-t border-border flex items-center justify-center gap-4 sm:gap-6 sticky left-0 w-full">
            <button
              onClick={() => setDays((prev: any) => Math.max(1, prev - 1))}
              className="flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-destructive hover:bg-background bg-background px-4 sm:px-8 py-2 rounded-xl transition-all border border-border uppercase tracking-[0.2em] shadow-sm active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Prune Row
            </button>
            <button
              onClick={() => setDays((prev: any) => prev + 1)}
              className="flex items-center gap-2 text-[10px] font-black text-primary hover:bg-background bg-background px-4 sm:px-8 py-2 rounded-xl transition-all border border-primary/20 uppercase tracking-[0.2em] shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Extend Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
