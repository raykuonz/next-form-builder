"use client";

import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";

import {
  DateFieldInstance,
  FormElementInstance,
  OnValueChangeFunctionType,
} from "@/lib/types"
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import DateField from ".";

const FormComponent = ({
  elementInstance,
  isInvalid,
  defaultValue,
  onValueChange,
}: {
  elementInstance: FormElementInstance;
  isInvalid?: boolean;
  defaultValue?: string;
  onValueChange?: OnValueChangeFunctionType;
}) => {

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

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
      <Label
        className={cn(error && "text-red-500")}
      >
        {label}
        {required && '*'}
      </Label>
      <Popover>
        <PopoverTrigger
          asChild
        >
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500",
            )}
          >
            <CalendarDaysIcon
              className="w-4 h-4 mr-2"
            />
            {date ? formatDate(date, 'PPP') : (
              <span>
                Pick a date
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            initialFocus
            selected={date}
            onSelect={(date) => {
              setDate(date);

              if (!onValueChange) return;

              const value = date?.toUTCString() || '';

              const isValid = DateField.checkValidity(element, value);

              setError(!isValid);

              onValueChange(element.id, value);
            }}
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormComponent