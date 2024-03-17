import {
  FormElementInstance,
  SelectFieldInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SelectFieldInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
    options,
  } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Select
        disabled
      >
        <SelectTrigger
          className="w-full"
        >
          <SelectValue
            placeholder={placeholder}
          />
        </SelectTrigger>
      </Select>
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