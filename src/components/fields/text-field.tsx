import { TypeIcon } from "lucide-react";

import { ElementsType, FormElement, FormElementInstance } from "@/lib/types"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Placeholder value'
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
}

const DesignerComponent = ({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as CustomInstance;

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

const TextField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: TypeIcon,
    label: 'Text field'
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>
}

export default TextField;
