import {
  CheckboxFieldInstance,
  FormElementInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as CheckboxFieldInstance;

  const {
    label,
    helperText,
    required,
  } = element.extraAttributes;

  const checkboxId = `checkbox-${element.id}`;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <div
        className="flex items-center gap-1.5 leading-none w-full"
      >
        <Checkbox
          id={checkboxId}
        />
        <Label
          htmlFor={checkboxId}
        >
          {label}
          {required && '*'}
        </Label>
      </div>
      {helperText && (
        <p
          className="text-muted-foreground text-[0.8rem]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default DesignerComponent;