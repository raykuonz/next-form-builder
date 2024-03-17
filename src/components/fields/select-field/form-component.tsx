"use client";

import { useEffect, useState } from "react";

import {
  FormElementInstance,
  OnValueChangeFunctionType,
  SelectFieldInstance,
} from "@/lib/types"
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import SelectField from ".";

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

  const element = elementInstance as SelectFieldInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
    options,
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
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);

          if (!onValueChange) return;

          const isValid = SelectField.checkValidity(element, value);

          setError(!isValid);

          onValueChange(element.id, value);
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full",
            error && "border-red-500"
          )}
        >
          <SelectValue
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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