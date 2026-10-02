import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  ArrowDownUp,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";

export interface SearchFiltersProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Essential toggles */
    essentials: React.ReactNode;
    /** Advanced options that expand */
    advanced: React.ReactNode;
    /** Apply / reset controls */
    actions: React.ReactNode;
    /** Whether advanced filters are expanded */
    advancedOpen?: boolean;
    onAdvancedToggle?: () => void;
  }

/**
 * SearchFilters — the ESSENTIAL / ADVANCED split per spec.
 * Do not overwhelm dispatchers with every option immediately.
 */
export function SearchFilters({
  className,
  essentials,
  advanced,
  actions,
  advancedOpen = true,
  onAdvancedToggle,
  ...props
}: SearchFiltersProps) {
  return (
    <div
      className={cn(
        "flex",
        "flex-wrap",
        "items-center",
        "gap-3",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-3",
        className
      )}
      {...props}
    >
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary pointer-events-none" aria-hidden="true" />
        <Input
          placeholder="Search hospitals, resources, specialties..."
          className="pl-9"
          leftIcon={<Search className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onAdvancedToggle}
          aria-expanded={advancedOpen}
          aria-controls="advanced-filters-panel"
        >
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Advanced</span>
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              advancedOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="sm">
          <ArrowDownUp className="size-3.5" aria-hidden="true" />
        </Button>
      </div>

      <div
        id="advanced-filters-panel"
        className={cn(
          "hidden",
          advancedOpen ? "block" : "hidden",
          "flex-1 min-w-[240px]",
          "gap-3",
          "grid-cols-2",
          "sm:grid-cols-3",
          "text-xs",
          "text-text-secondary"
        )}
      >
        <div className="grid grid-cols-2 gap-2">
          <Select options={[{ value: "distance", label: "Distance" }]} />
          <Select options={[{ value: "eta", label: "ETA" }]} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Select options={[{ value: "freshness", label: "Freshness" }]} />
          <Select options={[{ value: "load", label: "Load" }]} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Select options={[{ value: "availability", label: "Availability" }]} />
          <div className="flex items-center gap-2">
            <Input />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">{essentials}</div>

      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
