"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Square,
  Layers,
  Library,
  Sparkles,
  GripVertical,
  MousePointer,
} from "lucide-react";

type ComponentType = "button" | "card" | "accordion" | "badge";

interface BaseComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

interface ButtonComponent extends BaseComponent {
  type: "button";
  variant: string;
  size: string;
  props: { children: string };
}

interface CardComponent extends BaseComponent {
  type: "card";
  props: { title: string; content: string };
}

interface AccordionComponent extends BaseComponent {
  type: "accordion";
  props: { title: string; content: string };
}

interface BadgeComponent extends BaseComponent {
  type: "badge";
  variant: string;
  props: { children: string };
}

type ComponentItem =
  | ButtonComponent
  | CardComponent
  | AccordionComponent
  | BadgeComponent;

interface DraggableComponentProps {
  component: ComponentItem;
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
  onDrop?: (draggedId: string, targetId: string) => void;
  isDraggedOver?: boolean;
}

function DraggableComponent({
  component,
  onDragStart,
  onDragEnd,
  onDrop,
  isDraggedOver = false,
}: DraggableComponentProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", component.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart?.(component.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    onDrop?.(draggedId, component.id);
  };

  const renderComponent = () => {
    switch (component.type) {
      case "button":
        return (
          <Button
            variant={component.variant}
            size={component.size}
            className="w-full"
          >
            {component.props.children}
          </Button>
        );
      case "card":
        return (
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{component.props.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-zinc-400">{component.props.content}</p>
            </CardContent>
          </Card>
        );
      case "accordion":
        return (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-zinc-700">
              <AccordionTrigger className="text-sm py-2">
                {component.props.title}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-zinc-400">
                {component.props.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      case "badge":
        return (
          <Badge variant={component.variant} className="w-fit">
            {component.props.children}
          </Badge>
        );
      default:
        return <div>Unknown component</div>;
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        relative group cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? "opacity-50 scale-95 rotate-1" : ""}
        ${isDraggedOver ? "scale-105" : ""}
      `}
    >
      {/* Drag Handle */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <GripVertical className="h-4 w-4 text-zinc-500" />
      </div>

      {/* Type Badge */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Badge
          variant="secondary"
          className="text-xs px-1 py-0 bg-zinc-800 text-zinc-300"
        >
          {component.type}
        </Badge>
      </div>

      {/* Highlight border */}
      <div
        className={`absolute inset-0 rounded-md border-2 transition-all pointer-events-none ${
          isDraggedOver ? "border-blue-500 bg-blue-500/5" : "border-transparent"
        }`}
      />

      <div className="relative">{renderComponent()}</div>
    </div>
  );
}

export function LeftSidebar() {
  const [components, setComponents] = useState<ComponentItem[]>([
    {
      id: "btn-1",
      type: "button",
      variant: "default",
      size: "default",
      props: { children: "Click Me" },
    },
    {
      id: "card-1",
      type: "card",
      props: {
        title: "Sample Card",
        content: "This is a draggable card component",
      },
    },
    {
      id: "accordion-1",
      type: "accordion",
      props: {
        title: "Settings",
        content: "Configure your preferences here",
      },
    },
    {
      id: "btn-2",
      type: "button",
      variant: "outline",
      size: "sm",
      props: { children: "Secondary" },
    },
    {
      id: "badge-1",
      type: "badge",
      variant: "default",
      props: { children: "New Feature" },
    },
    {
      id: "card-2",
      type: "card",
      props: {
        title: "Dashboard",
        content: "View your analytics and stats",
      },
    },
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (itemId: string) => setDraggedItem(itemId);
  const handleDragEnd = () => setDraggedItem(null);

  const handleDrop = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    const draggedIndex = components.findIndex((c) => c.id === draggedId);
    const targetIndex = components.findIndex((c) => c.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newComponents = [...components];
    const [draggedComponent] = newComponents.splice(draggedIndex, 1);
    newComponents.splice(targetIndex, 0, draggedComponent);
    setComponents(newComponents);
  };

  const addComponent = (type: ComponentType) => {
    const newId = `${type}-${Date.now()}`;
    let newComponent: ComponentItem;

    switch (type) {
      case "button":
        newComponent = {
          id: newId,
          type,
          variant: "default",
          size: "default",
          props: { children: "New Button" },
        };
        break;
      case "card":
        newComponent = {
          id: newId,
          type,
          props: { title: "New Card", content: "Card description" },
        };
        break;
      case "accordion":
        newComponent = {
          id: newId,
          type,
          props: { title: "New Accordion", content: "Accordion content" },
        };
        break;
      case "badge":
        newComponent = {
          id: newId,
          type,
          variant: "default",
          props: { children: "Badge" },
        };
        break;
      default:
        return;
    }

    setComponents([newComponent, ...components]);
  };

  const groupedComponents = (type: ComponentType) =>
    components.filter((c) => c.type === type);

  return (
    <div className="h-full w-full bg-zinc-950 border-r border-zinc-800">
      <div className="p-4">{/* Tabs placeholder (optional) */}</div>
      {/* <Separator className="bg-zinc-800" /> */}

      <div className="p-4">
        <Accordion type="multiple" className="space-y-2">
          {(["button", "card", "accordion", "badge"] as ComponentType[]).map(
            (type) => (
              <AccordionItem key={type} value={type}>
                <AccordionTrigger className="capitalize text-sm">
                  {type}s ({groupedComponents(type).length})
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pl-6">
                  {groupedComponents(type).map((component) => (
                    <DraggableComponent
                      key={component.id}
                      component={component}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                      isDraggedOver={
                        draggedItem !== null && draggedItem !== component.id
                      }
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>

        <Separator className="bg-zinc-800 mb-4" />
      </div>
    </div>
  );
}
