import { TypeIcon } from "lucide-react";

import {
  ElementsType,
  FormElement
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Placeholder value'
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
  propertiesComponent: PropertiesComponent,
}

export default TextField;
