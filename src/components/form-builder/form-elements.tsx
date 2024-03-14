import { ElementsType, FormElement } from "@/lib/types"
import TextField from "../fields/text-field";
import TitleField from "../fields/title-field";
import SubTitleField from "../fields/sub-title-field";
import ParagraphField from "../fields/paragraph-field";

type FormElementsType = {
  [key in ElementsType]: FormElement;
}

const FormElements: FormElementsType = {
  'TextField': TextField,
  'TitleField': TitleField,
  'SubTitleField': SubTitleField,
  'ParagraphField': ParagraphField,
}

export default FormElements