import {
  FormElementInstance,
  ParagraphFieldInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as ParagraphFieldInstance;

  const { label } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label
        className="text-muted-foreground"
      >
        Paragraph
      </Label>
      <p>
        {label}
      </p>
    </div>
  );
}

export default DesignerComponent;