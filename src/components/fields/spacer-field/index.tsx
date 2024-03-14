import { SeparatorHorizontalIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  SpacerFieldExtraAttributes,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'SpacerField';

const extraAttributes: SpacerFieldExtraAttributes = {
  height: 20,
}

const SpacerField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: SeparatorHorizontalIcon,
    label: 'Spacer'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: () => true,
}

export default SpacerField;
