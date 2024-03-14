import { FormElementInstance } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label
        className="text-muted-foreground"
      >
        Separator
      </Label>
      <Separator />
    </div>
  );
}

export default DesignerComponent;