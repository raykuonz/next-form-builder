import {
  FormElementInstance,
  TitleFieldInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as TitleFieldInstance;

  const { label } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label
        className="text-muted-foreground"
      >
        Title
      </Label>
      <p
        className="text-xl"
      >
        {label}
      </p>
    </div>
  );
}

export default DesignerComponent;