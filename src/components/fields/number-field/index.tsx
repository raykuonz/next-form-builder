import { HashIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  NumberFieldInstance,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'NumberField';

const extraAttributes = {
  label: 'Number field',
  helperText: 'Helper text',
  required: false,
  placeholder: '0'
}

const NumberField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: HashIcon,
    label: 'Number field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: (formElement: FormElementInstance, value: string): boolean => {
    const element = formElement as NumberFieldInstance;

    if (element.extraAttributes.required) {
      if (value.length <= 0) {
        return false;
      }
    }

    const numberValue = Number(value);

    return typeof numberValue === 'number'
      && !isNaN(numberValue);
  },
}

export default NumberField;
