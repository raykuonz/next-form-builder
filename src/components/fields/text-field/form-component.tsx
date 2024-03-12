import {
  FormElementInstance,
  TextFieldInstance,
} from "@/lib/types"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as TextFieldInstance;

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

export default FormComponent