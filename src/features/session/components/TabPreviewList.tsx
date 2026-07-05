import type { BrowserTab } from "../models";
import { TabPreview } from "./TabPreview";

interface TabPreviewListProps {
  tabs: BrowserTab[];
}

export function TabPreviewList({
  tabs,
}: TabPreviewListProps) {
  return (
    <div className="mt-3 rounded-lg border bg-gray-50 p-2">
      {tabs.map((tab) => (
        <TabPreview
          key={tab.id}
          tab={tab}
        />
      ))}
    </div>
  );
}