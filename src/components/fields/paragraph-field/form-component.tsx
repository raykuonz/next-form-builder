import {
  FormElementInstance,
  ParagraphFieldInstance,
} from "@/lib/types"
const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as ParagraphFieldInstance;

  const { label } = element.extraAttributes;

  return (
    <p>
      {label}
    </p>
  );
}

export default FormComponent