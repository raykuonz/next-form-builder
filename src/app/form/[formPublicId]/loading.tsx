import { Loader2Icon } from "lucide-react";

const FormLoading = () => {
  return (
    <div
      className="flex w-full items-center justify-center"
    >
      <Loader2Icon
        className="h-12 w-12 animate-spin"
      />
    </div>
  )
}

export default FormLoading