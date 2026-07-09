import type { BrowserTab } from "../models";
import { TabPreview } from "./TabPreview";

interface TabPreviewListProps {
  tabs: BrowserTab[];
}

export function TabPreviewList({
  tabs,
}: TabPreviewListProps) {
  return (
   <div className="mt-3 rounded-xl border border-slate-700 bg-[#0b0d1a] overflow-hidden">
  <div className="max-h-64 overflow-y-auto p-2 tab-scroll">
    {tabs.map((tab) => (
      <TabPreview key={tab.id} tab={tab} />
    ))}
  </div>
</div>
  );
}