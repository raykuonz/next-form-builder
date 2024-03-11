"use client";

import { Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import PreviewDialogButton from "./preview-dialog-button";
import SaveFormButton from "./save-form-button";
import PublishFormbutton from "./publish-form-button";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";

interface FormBuilderProps {
  form: Form;
}

const FormBuilder = ({
  form
}: FormBuilderProps) => {

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    }
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // 300ms
      tolerance: 5, // 5px
    }
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
    >
      <div
        className="flex flex-col w-full"
      >
        <nav
          className="flex justify-between border-b-2 p-4 gap-3 items-center"
        >
          <h2 className="truncate font-medium">
            <span
              className="text-muted-foreground mr-2"
            >
              Form:
            </span>
            {form.name}
          </h2>
          <div
            className="flex items-center gap-2"
          >
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormbutton />
              </>
            )}
          </div>
        </nav>
        <div
          className="w-full flex flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]"
        >
          <Designer />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder