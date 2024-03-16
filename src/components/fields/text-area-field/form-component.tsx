"use client";

import {
  FormElementInstance,
  OnValueChangeFunctionType,
  TextAreaFieldInstance,
} from "@/lib/types"
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TextAreaField from ".";
import { Textarea } from "@/components/ui/textarea";

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

  const [value, setValue] = useState<string>(defaultValue || '');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance as TextAreaFieldInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
    rows,
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
      <Textarea
        rows={rows}
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!onValueChange) return;

          const isValid = TextAreaField.checkValidity(element, e.target.value);
          setError(!isValid);

          onValueChange(element.id, e.target.value)
        }}
        value={value}
      />
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