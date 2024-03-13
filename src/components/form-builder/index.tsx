"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyIcon,
  Loader2Icon,
} from "lucide-react";
import Confetti from "react-confetti";
import { toast } from "sonner";

import useDesigner from "@/hooks/use-designer";
import PreviewDialogButton from "./preview-dialog-button";
import SaveFormButton from "./save-form-button";
import PublishFormbutton from "./publish-form-button";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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


  if (form.published) {

    const shareUrl = `${window.location.origin}/form/${form.shareUrl}`;

    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div
          className="flex flex-col items-center justify-center w-full h-full"
        >
          <div
            className="max-w-md"
          >
            <h1
              className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10"
            >
              🎉 Form published 🎉
            </h1>
            <p
              className="text-2xl"
            >
              Share this form
            </p>
            <p
              className="text-xl text-muted-foreground border-b pb-10"
            >
              Anyone with the link can view and submit the form.
            </p>
            <div
              className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4"
            >
              <Input
                className="w-full"
                readOnly
                value={shareUrl}
              />
              <Button
                className="w-full"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success('Link copied.');
                  } catch (error) {
                    toast.error('Link copy failed.')
                  }
                }}
              >
                <CopyIcon
                  className="w-4 h-4 mr-2"
                />
                Copy link
              </Button>
            </div>
            <div
              className="flex justify-between"
            >
              <Button
                variant="link"
                asChild
              >
                <Link
                  href="/"
                  className="gap-2"
                >
                  <ArrowLeftIcon
                    className="w-4 h-4"
                  />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="link"
                asChild
              >
                <Link
                  href={`/forms/${form.id}`}
                  className="gap-2"
                >
                  Form details
                  <ArrowRightIcon
                    className="w-4 h-4"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
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
                <PublishFormbutton
                  formId={form.id}
                />
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