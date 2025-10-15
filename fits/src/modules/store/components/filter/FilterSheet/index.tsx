import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";

const FilterSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <FilterIcon className="size-3.5" />
          <span className="text-xs text-accent-foreground first-letter:uppercase">
            filter
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="first-letter:uppercase text-sm text-accent-foreground flex items-center justify-start">
            <div className="flex items-center justify-between gap-2 w-[50%]">
              <div className="underline text-accent-foreground text-xs first-letter:uppercase">
                clear
              </div>
              <span className="text-accent-foreground text-sm first-letter:uppercase">
                filter
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="px-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
