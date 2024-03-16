import {
  FormElementInstance,
  TextAreaFieldInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as TextAreaFieldInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
    rows,
  } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Textarea
        readOnly
        disabled
        placeholder={placeholder}
        rows={1}
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