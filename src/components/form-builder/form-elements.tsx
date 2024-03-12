import { ElementsType, FormElement } from "@/lib/types"
import TextField from "../fields/text-field";

type FormElementsType = {
  [key in ElementsType]: FormElement;
}

const FormElements: FormElementsType = {
  'TextField': TextField,
}

export default FormElements