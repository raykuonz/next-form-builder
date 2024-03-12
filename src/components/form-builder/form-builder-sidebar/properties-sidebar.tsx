"use client";

import { XIcon } from "lucide-react";

import useDesigner from "@/hooks/use-designer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormElements from "../form-elements";

const PropertiesSidebar = () => {

  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div
      className="flex flex-col p-2"
    >
      <div
        className="flex justify-between items-center"
      >
        <p
          className="text-sm text-foreground/70"
        >
          Element properties
        </p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <XIcon />
        </Button>
      </div>
      <Separator
        className="mb-4"
      />
      <PropertiesForm
        elementInstance={selectedElement}
      />
    </div>
  )
}

export default PropertiesSidebar