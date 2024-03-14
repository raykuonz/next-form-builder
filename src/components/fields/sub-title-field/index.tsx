import { Heading2Icon } from "lucide-react";

import {
  ElementsType,
  FormElement,
  SubTitleFieldExtraAttributes,
} from "@/lib/types"
import DesignerComponent from "./designer-component";
import PropertiesComponent from "./properties-component";
import FormComponent from "./form-component";

const type: ElementsType = 'SubTitleField';

const extraAttributes: SubTitleFieldExtraAttributes = {
  label: 'Sub title',
}

const SubTitleField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Heading2Icon,
    label: 'Sub title'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  checkValidity: () => true,
}

export default SubTitleField;
