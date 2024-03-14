import {
  FormElementInstance,
  TitleFieldInstance,
} from "@/lib/types"
const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as TitleFieldInstance;

  const { label } = element.extraAttributes;

  return (
    <p
      className="text-xl"
    >
      {label}
    </p>
  );
}

export default FormComponent