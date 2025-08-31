"use client";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Layers,
  Library,
  Sparkles,
} from "lucide-react";
import {
  ComponentRegistry,
  BaseComponent,
  ComponentType,
} from "../../lib/components-registry";

/* ----------------------
   Sidebar Tabs
----------------------- */
function SegmentedTabs() {
  const [activeTab, setActiveTab] = useState("Layers");

  const tabs = [
    { key: "Layers", icon: <Layers className="h-3 w-3 mr-1" /> },
    { key: "Library", icon: <Library className="h-3 w-3 mr-1" /> },
    { key: "Generate", icon: <Sparkles className="h-3 w-3 mr-1" /> },
  ];

  return (
    <div className="flex bg-zinc-800/70 rounded-md p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex items-center px-3 py-1.5 text-[12px] rounded-md transition-all cursor-pointer
            ${
              activeTab === tab.key
                ? "bg-zinc-900 text-white border-amber-50"
                : "text-zinc-400 hover:text-white"
            }`}
        >
          {tab.icon}
          {tab.key}
        </button>
      ))}
    </div>
  );
}

/* ----------------------
   Sidebar Draggable
----------------------- */
function DraggableComponent({ component }: { component: BaseComponent }) {
  const [locked, setLocked] = useState(component.locked ?? false);
  const [hidden, setHidden] = useState(component.hidden ?? false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (locked) return;
    e.dataTransfer.setData("application/json", JSON.stringify(component));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable={!locked}
      onDragStart={handleDragStart}
      className="group flex items-center justify-between px-2 py-1 rounded-md cursor-grab hover:bg-zinc-800"
    >
      <div className="flex items-center gap-2">
        {ComponentRegistry[component.type].preview}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setLocked((prev) => !prev)}
          className="p-1 hover:bg-zinc-700 rounded"
        >
          {locked ? (
            <Lock className="h-3 w-3 text-white" />
          ) : (
            <Unlock className="h-3 w-3 text-white" />
          )}
        </button>
        <button
          onClick={() => setHidden((prev) => !prev)}
          className="p-1 hover:bg-zinc-700 rounded"
        >
          {hidden ? (
            <EyeOff className="h-3 w-3 text-zinc-400" />
          ) : (
            <Eye className="h-3 w-3 text-zinc-400" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ----------------------
   Sidebar Main
----------------------- */
export function LeftSidebar() {
  // Build initial list of draggable components from registry
  const [components] = useState<BaseComponent[]>(() =>
    (Object.keys(ComponentRegistry) as ComponentType[]).map((type, i) => ({
      id: `${type}-${i + 1}`,
      type,
      ...(ComponentRegistry[type].defaultProps ?? {}),
    }))
  );

  return (
    <div className="h-full w-full bg-zinc-950 border-r border-zinc-800">
      <div className="p-2">
        <SegmentedTabs />
      </div>
      <div className="space-y-3 mb-4 p-4">
        {components.map((component) => (
          <DraggableComponent key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}
