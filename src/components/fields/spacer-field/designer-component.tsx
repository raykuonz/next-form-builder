import { SeparatorHorizontalIcon } from "lucide-react";

import {
  FormElementInstance,
  SpacerFieldInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SpacerFieldInstance;

  const { height } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label
        className="text-muted-foreground"
      >
        Spacer {height}px
      </Label>
      <p
        className="text-xl"
      >
        <SeparatorHorizontalIcon
          className="h-8 w-8"
        />
      </p>
    </div>
  );
}

export default DesignerComponent;