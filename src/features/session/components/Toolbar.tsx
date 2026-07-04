import { SearchBox } from "./SearchBox";

interface ToolbarProps {
  onSearch: (query: string) => void;
  filter: "all" | "favorites";
  onFilterChange: (value: "all" | "favorites") => void;

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
    <div className="mb-4 flex flex-col gap-3">
      <SearchBox onSearch={onSearch} />

      <div className="flex gap-2">
        <select
          value={filter}
          onChange={(e) =>
            onFilterChange(
              e.target.value as "all" | "favorites"
            )
          }
          className="flex-1 rounded border p-2"
        >
          <option value="all">All</option>
          <option value="favorites">
            Favorites
          </option>
        </select>

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
          className="flex-1 rounded border p-2"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
          <option value="most-restored">
            Most Restored
          </option>
        </select>
      </div>
    </div>
  );
}