import { CheckSquare2Icon } from "lucide-react";

import {
  CheckboxFieldInstance,
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'CheckboxField';

const extraAttributes = {
  label: 'Checkbox field',
  helperText: 'Helper text',
  required: false,
}

const CheckboxField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: CheckSquare2Icon,
    label: 'Checkbox field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: (formElement: FormElementInstance, value: string): boolean => {
    const element = formElement as CheckboxFieldInstance;

    if (element.extraAttributes.required) {
      return value === 'true';
    }

    return true;
  },
}

export default CheckboxField;
