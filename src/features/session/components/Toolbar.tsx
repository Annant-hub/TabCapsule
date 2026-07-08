import { Search, Star, ArrowUpDown } from "lucide-react";
import { Card } from "../../../shared/ui";
import { SearchBox } from "./SearchBox";

interface ToolbarProps {
  onSearch: (query: string) => void;

  filter: "all" | "favorites";

  onFilterChange: (
    value: "all" | "favorites"
  ) => void;

  sort:
    | "latest"
    | "oldest"
    | "name-asc"
    | "name-desc"
    | "most-restored";

  onSortChange: (
    value:
      | "latest"
      | "oldest"
      | "name-asc"
      | "name-desc"
      | "most-restored"
  ) => void;
}

export function Toolbar({
  onSearch,
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: ToolbarProps) {
  return (
    <Card className="mb-5 p-4">

      <SearchBox onSearch={onSearch} />

      <div className="mt-4 grid grid-cols-2 gap-3">

        {/* Filter */}

        <div className="relative">

          <Star
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
          />

          <select
            value={filter}
            onChange={(e) =>
              onFilterChange(
                e.target.value as
                  | "all"
                  | "favorites"
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              py-2
              pl-10
              pr-3
              text-sm
              text-slate-100
              outline-none
              transition-all
              focus:border-rose-500
            "
          >
            <option value="all">
              All Workspaces
            </option>

            <option value="favorites">
              Favorites
            </option>

          </select>

        </div>

        {/* Sort */}

        <div className="relative">

          <ArrowUpDown
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={sort}
            onChange={(e) =>
              onSortChange(
                e.target.value as
                  | "latest"
                  | "oldest"
                  | "name-asc"
                  | "name-desc"
                  | "most-restored"
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              py-2
              pl-10
              pr-3
              text-sm
              text-slate-100
              outline-none
              transition-all
              focus:border-rose-500
            "
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="name-asc">
              A → Z
            </option>

            <option value="name-desc">
              Z → A
            </option>

            <option value="most-restored">
              Most Restored
            </option>

          </select>

        </div>

      </div>

    </Card>
  );
}