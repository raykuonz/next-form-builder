import { TextIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  ParagraphFieldExtraAttributes,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'ParagraphField';

const extraAttributes: ParagraphFieldExtraAttributes = {
  label: 'Text',
}

const ParagraphField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: TextIcon,
    label: 'Paragraph'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: () => true,
}

export default ParagraphField;
