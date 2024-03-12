"use client";

import { useEffect, useState } from "react";
import { Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { Loader2Icon } from "lucide-react";

import useDesigner from "@/hooks/use-designer";
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

  const { setElements } = useDesigner();
  const [isMounteed, setIsMounted] = useState<boolean>(false);

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

  useEffect(() => {

    if (isMounteed) return;

    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsMounted(true);
  }, [form, setElements, isMounteed])


  if (!isMounteed) {
    return (
      <div
        className="flex w-full items-center justify-center"
      >
        <Loader2Icon
          className="h-12 w-12 animate-spin"
        />
      </div>
    );
  }

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
                <SaveFormButton
                  formId={form.id}
                />
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