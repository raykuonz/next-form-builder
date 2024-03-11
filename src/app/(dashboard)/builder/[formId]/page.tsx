import { getFormById } from "@/actions/form-actions";
import FormBuilder from "@/components/form-builder";

interface BuilderPageProps {
  params: {
    formId: string;
  };
}

const BuilderPage = async ({
  params
}: BuilderPageProps) => {

  const form = await getFormById(parseInt(params.formId));

  return (
    <FormBuilder
      form={form}
    />
  )
}

export default BuilderPage;