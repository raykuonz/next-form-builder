import {
  DateFieldInstance,
  FormElementInstance,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon } from "lucide-react";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as DateFieldInstance;

  const {
    label,
    helperText,
    required,
  } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
      >
        <CalendarDaysIcon
          className="w-4 h-4 mr-2"
        />
        <span>
          Pick a date
        </span>
      </Button>
      {helperText && (
        <p
          className="text-muted-foreground text-[0.8rem]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default DesignerComponent;