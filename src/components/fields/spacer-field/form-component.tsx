import {
  FormElementInstance,
  SpacerFieldInstance,
} from "@/lib/types"
const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SpacerFieldInstance;

  const { height } = element.extraAttributes;

  return (
    <div
      style={{
        height,
        width: '100%',
      }}
    />
  );
}

export default FormComponent