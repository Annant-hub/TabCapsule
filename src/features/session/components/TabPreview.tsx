import type { BrowserTab } from "../models";

interface TabPreviewProps {
  tab: BrowserTab;
}

export function TabPreview({ tab }: TabPreviewProps) {
  const favicon =
    tab.faviconUrl ||
    `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(
      tab.url
    )}&sz=32`;

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100">
      <img
        src={favicon}
        alt={tab.title}
        className="h-5 w-5 rounded"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {tab.title}
        </p>

        <p className="truncate text-xs text-gray-500">
          {tab.url}
        </p>
      </div>
    </div>
  );
}