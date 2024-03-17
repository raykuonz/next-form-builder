"use client";

import { useEffect, useState } from "react";

import {
  CheckboxFieldInstance,
  FormElementInstance,
  OnValueChangeFunctionType,
} from "@/lib/types"
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import CheckboxField from ".";

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

  const [value, setValue] = useState<boolean>(defaultValue === 'true');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance as CheckboxFieldInstance;

  const {
    label,
    helperText,
    required,
  } = element.extraAttributes;

  const checkboxId = `checkbox-${element.id}`;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <div
        className="flex items-center gap-1.5 leading-none w-full"
      >
        <Checkbox
          id={checkboxId}
          checked={value}
          className={cn(error && 'border-red-500')}
          onCheckedChange={(checked) => {
            const isChecked = checked === true;

            setValue(isChecked);

            if (!onValueChange) return;

            const stringValue = isChecked ? 'true' : 'false';

            const isValid = CheckboxField.checkValidity(element, stringValue);

            setError(!isValid);

            onValueChange(element.id, stringValue);
          }}
        />
        <Label
          htmlFor={checkboxId}
          className={cn(error && 'text-red-500')}
        >
          {label}
          {required && '*'}
        </Label>
      </div>
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && 'text-red-500',
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormComponent