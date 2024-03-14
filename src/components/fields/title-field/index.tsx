import { Heading1Icon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  TitleFieldExtraAttributes,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'TitleField';

const extraAttributes: TitleFieldExtraAttributes = {
  label: 'Title',
}

const TitleField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Heading1Icon,
    label: 'Title'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: () => true,
}

export default TitleField;
