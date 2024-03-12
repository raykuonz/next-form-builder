"use client";

import { useState } from "react"
import { Trash2 } from "lucide-react"
import {
  useDraggable,
  useDroppable
} from "@dnd-kit/core"

import { FormElementInstance } from "@/lib/types"
import { cn } from "@/lib/utils"
import useDesigner from "@/hooks/use-designer"
import { Button } from "../ui/button"
import FormElements from "./form-elements"

interface DesignerElementWrapperProps {
  element: FormElementInstance
}

const DesignerElementWrapper = ({
  element,
}: DesignerElementWrapperProps) => {

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const {
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    }
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    }
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    }
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div
            className="absolute right-0 h-full"
          >
            <Button
              variant="outline"
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={() => {
                removeElement(element.id);
              }}
            >
              <Trash2
                className="w-6 h-6"
              />
            </Button>
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
          >
            <p
              className="text-muted-foreground text-sm"
            >
              Click for properties or drag to move.
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div
          className="absolute top-0 w-full rounded-md rounded-b-none h-[8px] bg-primary"
        />
      )}
      {bottomHalf.isOver && (
        <div
          className="absolute bottom-0 w-full rounded-md rounded-t-none h-[8px] bg-primary"
        />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement
          elementInstance={element}
        />
      </div>
    </div>
  )
}

DesignerElementWrapper.DragOverlay = function DesignerElementWrapperDragOverlay({
  element,
}: DesignerElementWrapperProps) {

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      className="flex items-center bg-accent broder rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none"
    >
      <DesignerElement
        elementInstance={element}
      />
    </div>
  );
}

export default DesignerElementWrapper