"use client";

import { ScanEyeIcon } from "lucide-react"

import useDesigner from "@/hooks/use-designer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormElements from "./form-elements";

const PreviewDialogButton = () => {

  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button
          variant="outline"
          className="gap-2"
        >
          <ScanEyeIcon
            className="w-4 h-4"
          />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0"
      >
        <div
          className="px-4 py-2 border-b"
        >
          <p
            className="text-lg font-bold text-muted-foreground"
          >
            Form preview
          </p>
          <p
            className="text-sm text-muted-foreground"
          >
            This is how your form will look like for your user.
          </p>
        </div>
        <div
          className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)] overflow-y-auto"
        >
          <div
            className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-3xl p-8 overflow-y-auto"
          >
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewDialogButton