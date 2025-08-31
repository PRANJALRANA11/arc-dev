"use client";
import { useState, useRef } from "react";
import {
  ComponentRegistry,
  BaseComponent,
} from "../../lib/components-registry";

interface PositionedComponent extends BaseComponent {
  x: number;
  y: number;
}

export function CanvasArea() {
  const [canvasComponents, setCanvasComponents] = useState<
    PositionedComponent[]
  >([]);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const dropped: BaseComponent = JSON.parse(data);
    const canvasRect = canvasRef.current?.getBoundingClientRect();

    if (canvasRect) {
      // Position the component where it was dropped
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;

      const newComp: PositionedComponent = {
        ...dropped,
        id: `${dropped.type}-${Date.now()}`,
        x,
        y,
      };

      setCanvasComponents((prev) => [...prev, newComp]);
    }
  };

  const handleComponentMouseDown = (
    e: React.MouseEvent,
    componentId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const component = canvasComponents.find((comp) => comp.id === componentId);
    if (!component) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    // Calculate offset from mouse to component's top-left corner
    const offsetX = e.clientX - canvasRect.left - component.x;
    const offsetY = e.clientY - canvasRect.top - component.y;

    setDraggedComponent(componentId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedComponent) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;

    setCanvasComponents((prev) =>
      prev.map((comp) =>
        comp.id === draggedComponent
          ? { ...comp, x: Math.max(0, newX), y: Math.max(0, newY) }
          : comp
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedComponent(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const deleteComponent = (componentId: string) => {
    setCanvasComponents((prev) =>
      prev.filter((comp) => comp.id !== componentId)
    );
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center overflow-auto">
      <div className="relative w-full h-full max-w-[1160px]">
        <div
          ref={canvasRef}
          className="relative w-full h-full border-2 border-dashed border-zinc-700 overflow-hidden"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves canvas
        >
          {canvasComponents.map((comp) => (
            <div
              key={comp.id}
              className="absolute group cursor-move"
              style={{
                left: comp.x,
                top: comp.y,
                transform:
                  draggedComponent === comp.id ? "scale(1.05)" : "scale(1)",
                transition:
                  draggedComponent === comp.id ? "none" : "transform 0.1s ease",
                zIndex: draggedComponent === comp.id ? 1000 : 1,
              }}
              onMouseDown={(e) => handleComponentMouseDown(e, comp.id)}
            >
              {/* Delete button - appears on hover */}
              <button
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteComponent(comp.id);
                }}
                title="Delete component"
              >
                ×
              </button>

              {/* Component content */}
              <div className="pointer-events-none">
                {ComponentRegistry[comp.type].render(comp)}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {canvasComponents.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-full text-zinc-500">
              <div className="text-lg font-medium mb-2">
                Drop components here
              </div>
              <div className="text-sm">
                Drag components from the sidebar to get started
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
