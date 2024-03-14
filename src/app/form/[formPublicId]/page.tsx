import { getFormByPublicId } from "@/actions/form-actions";
import { FormElementInstance } from "@/lib/types";
import FormSubmitComponent from "./_component/form-submit-component";

interface FormPageProps {
  params: {
    formPublicId: string;
  };
}

const FormPage = async ({
  params
}: FormPageProps) => {

  const form = await getFormByPublicId(params.formPublicId);

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent
      formPublicId={params.formPublicId}
      name={form.name}
      description={form.description}
      formElements={formContent}
    />
  )
}

export default FormPage