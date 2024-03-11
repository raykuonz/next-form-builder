"use client";

import {
  DragEndEvent,
  useDndMonitor,
  useDroppable
} from "@dnd-kit/core";

import DesignerSidebar from "./designer-sidebar";
import { cn } from "@/lib/utils";
import { ElementsType } from "@/lib/types";
import useDesigner from "@/hooks/use-designer";
import FormElements from "./form-elements";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "./designer-element-wrapper";

const Designer = () => {

  const { elements, addElement } = useDesigner();

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

      const isSidebarButtonElement = active?.data?.current?.isDesignerButtonElement;

      if (isSidebarButtonElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);

      }

    },
  })

  return (
    <div
      className="w-full h-full flex"
    >
      <div
        className="w-full p-4"
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20",
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