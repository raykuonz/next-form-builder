import { MenuSquareIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  TextFieldInstance
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'SelectField';

const extraAttributes = {
  label: 'Select field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Pick a value',
  options: []
}

const SelectField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: MenuSquareIcon,
    label: 'Select field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: (formElement: FormElementInstance, value: string): boolean => {
    const element = formElement as TextFieldInstance;

    if (element.extraAttributes.required) {
      return value.length > 0;
    }

    return true;
  },
}

export default SelectField;
