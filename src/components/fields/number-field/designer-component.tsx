import {
  FormElementInstance,
  NumberFieldInstance,
} from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as NumberFieldInstance;;

  const {
    label,
    helperText,
    required,
    placeholder,
  } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Input
        readOnly
        disabled
        type="number"
        placeholder={placeholder}
      />
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