import {
  FormElementInstance,
  SubTitleFieldInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SubTitleFieldInstance;

  const { label } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label
        className="text-muted-foreground"
      >
        Sub title
      </Label>
      <p
        className="text-lg"
      >
        {label}
      </p>
    </div>
  );
}

export default DesignerComponent;