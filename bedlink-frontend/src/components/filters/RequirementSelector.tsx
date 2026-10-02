import { cn } from "@/lib/cn";
import { Checkbox } from "@/components/ui/Checkbox";

export interface RequirementOption {
  id: string;
  label: string;
  /** Outline = not selected; filled = selected */
  selected?: boolean;
}

export interface RequirementSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
    /** Options available (e.g. required care) */
    options: RequirementOption[];
    /** Which are selected */
    selected: string[];
    /** Whether multiple selection is allowed */
    multiple?: boolean;
    /** On change */
    onChange: (values: string[]) => void;
    /** Header label for the section */
    header?: string;
    /** Show "all" checkbox */
    showAll?: boolean;
    /** All option value */
    allValue?: string;
  }

/**
 * RequirementSelector — multi-select chips for required care
 * (Step 2 of the emergency creation flow). Clean, operational.
 */
export function RequirementSelector({
  className,
  options,
  selected,
  multiple = true,
  onChange,
  header,
  showAll = false,
  allValue = "all",
  ...props
}: RequirementSelectorProps) {
  const toggle = (id: string) => {
    if (showAll && id === allValue) {
      onChange(showAll ? [] : [allValue]);
      return;
    }
    if (showAll && id !== allValue) return;
    if (multiple) {
      const next = selected.includes(id)
        ? selected.filter((v) => v !== id)
        : [...selected, id];
      onChange(next);
    } else {
      onChange([id]);
    }
  };

  const isSelected = (id: string) => {
    if (showAll && selected.includes(allValue)) return true;
    return selected.includes(id);
  };

  return (
    <div
      className={cn(
        "flex",
        "flex-wrap",
        "gap-2",
        "rounded-lg",
        "border",
        "border-border",
        "bg-surface",
        "p-3",
        "max-h-[260px]",
        "overflow-y-auto",
        "scrollbar-thin",
        className
      )}
      {...props}
    >
      {header && (
        <div className="text-xs font-semibold text-text-secondary mb-2">
          {header}
        </div>
      )}
      {showAll && (
        <Checkbox
          checked={selected.includes(allValue)}
          onCheckedChange={() => toggle(allValue)}
          id="req-all"
          className="h-4 w-4"
        />
      )}
      {options.map((opt) => {
        const id = opt.id;
        return (
          <Checkbox
            key={id}
            checked={isSelected(id)}
            onCheckedChange={() => toggle(id)}
            id={`req-${id}`}
            className="h-4 w-4"
          >
            <span className="sr-only">{opt.label}</span>
          </Checkbox>
        );
      })}
    </div>
  );
}
