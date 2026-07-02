import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="🔍 Search workspaces..."
        value={query}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}