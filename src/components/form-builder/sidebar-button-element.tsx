"use client";

import { useDraggable } from "@dnd-kit/core";

import { FormElement } from "@/lib/types"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SidebarButtonElementProps {
  formElement: FormElement;
}

const SidebarButtonElement = ({
  formElement,
}: SidebarButtonElementProps) => {

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    }
  })

  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon
        className="h-8 w-8 text-primary cursor-grab"
      />
      <p
        className="text-xs"
      >
        {label}
      </p>
    </Button>
  )
}

SidebarButtonElement.DragOverlay = function SidebarButtonElementDragOverlay({
  formElement,
}: SidebarButtonElementProps) {
 const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
    >
      <Icon
        className="h-8 w-8 text-primary cursor-grab"
      />
      <p
        className="text-xs"
      >
        {label}
      </p>
    </Button>
  )
}

export default SidebarButtonElement