import { MinusIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'SeparatorField';

const SeparatorField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    icon: MinusIcon,
    label: 'Separator'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: () => true,
}

export default SeparatorField;
