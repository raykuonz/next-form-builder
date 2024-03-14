import {
  FormElementInstance,
  SubTitleFieldInstance,
} from "@/lib/types"
const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SubTitleFieldInstance;

  const { label } = element.extraAttributes;

  return (
    <p
      className="text-lg"
    >
      {label}
    </p>
  );
}

export default FormComponent