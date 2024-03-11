import { getForms } from "@/actions/form-actions"
import FormCard from "./form-card";

const FormCardList = async () => {

  const forms = await getForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
        />
      ))}
    </>
  )
}

export default FormCardList