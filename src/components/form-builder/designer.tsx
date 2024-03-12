"use client";

import {
  DragEndEvent,
  useDndMonitor,
  useDroppable
} from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { ElementsType } from "@/lib/types";
import useDesigner from "@/hooks/use-designer";
import FormElements from "./form-elements";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "./designer-element-wrapper";
import DesignerSidebar from "./form-builder-sidebar/designer-sidebar";

const Designer = () => {

  const {
     elements,
     addElement,
     removeElement,
     selectedElement,
     setSelectedElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    }
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {

      const { active, over } = event;

      if (!active || !over) return;

      const isDraggingSidebarButtonElement = active?.data?.current?.isDesignerButtonElement;
      const isDraggingDesignerElement = active?.data?.current?.isDesignerElement;

      const isDroppingOverDesignerDropArea = over?.data?.current?.isDesignerDropArea;
      const isDroppingOverDesignerElementTopHalf = over?.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf = over?.data?.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf
        || isDroppingOverDesignerElementBottomHalf;

      // First scenario: dropping a sidebar button element over the designer drop area
      if (isDraggingSidebarButtonElement && isDroppingOverDesignerDropArea) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
      }

      // Second scenario: dropping a sidebar button element over the designer element
      if (isDraggingSidebarButtonElement && isDroppingOverDesignerElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overElementIndex = elements.findIndex((element) => element.id === over.data.current?.elementId);

        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }

        let newElementIndex = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          newElementIndex++;
        }

        addElement(newElementIndex, newElement);
      }

      // Third scenario: Dragging an designer element over another designer element
      if (isDraggingDesignerElement && isDroppingOverDesignerElement) {

        const activeElementId = active.data.current?.elementId;

        const activeElementIndex = elements.findIndex((element) => element.id === activeElementId);

        const overElementIndex = elements.findIndex((element) => element.id === over.data.current?.elementId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }

        const activeElement = {...elements[activeElementIndex]};

        removeElement(activeElementId);

        let newElementIndex = overElementIndex > activeElementIndex
          ? overElementIndex - 1
          : overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          newElementIndex++;
        }

        addElement(newElementIndex, activeElement);
      }
    },
  })

  return (
    <div
      className="w-full h-full flex"
    >
      <div
        className="w-full p-4"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset",
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p
              className="text-3xl text-muted-foreground flex flex-grow items-center font-bold"
            >
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div
              className="flex flex-col w-full gap-2 p-4"
            >
              {elements.map((element) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                />
              ))}
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div
              className="w-full p-4"
            >
              <div
                className="h-[120px] rounded-md bg-primary/20"
              >

              </div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

export default Designer