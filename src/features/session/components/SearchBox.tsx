import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export function SearchBox({
  onSearch,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setQuery(value);
    onSearch(value);
  }

  return (
    <div className="relative">

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        value={query}
        onChange={handleChange}
        placeholder="Search workspaces..."
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-950
          py-3
          pl-11
          pr-4
          text-slate-100
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200
          focus:border-rose-500
          focus:ring-2
          focus:ring-rose-500/20
        "
      />

    </div>
  );
}