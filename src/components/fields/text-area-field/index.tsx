import { ReceiptTextIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  TextAreaFieldInstance,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'TextAreaField';

const extraAttributes = {
  label: 'Text Area field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Placeholder value',
  rows: 5,
}

const TextAreaField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: ReceiptTextIcon,
    label: 'Text area field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: (formElement: FormElementInstance, value: string): boolean => {
    const element = formElement as TextAreaFieldInstance;

    if (element.extraAttributes.required) {
      return value.length > 0;
    }

    return true;
  },
}

export default TextAreaField;
