import {
  ElementType,
  FC
} from "react";

export type ElementsType = 'TextField';

export type OnValueChangeFunctionType = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: ( id: string ) => FormElementInstance;

  designerButtonElement: {
    icon: ElementType;
    label: string;
  };
  designerComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: FC<{
    elementInstance: FormElementInstance;
    isInvalid?: boolean;
    defaultValue?: string;
    onValueChange?: OnValueChangeFunctionType;
  }>;
  propertiesComponent: FC<{
    elementInstance: FormElementInstance;
  }>;

  checkValidity: (formElement: FormElementInstance, value: string) => boolean;
}

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
}

export type TextFieldExtraAttributes = {
  label: string;
  helperText: string;
  required: boolean,
  placeholder: string;
}

export type TextFieldInstance = FormElementInstance & {
  extraAttributes: TextFieldExtraAttributes;
}
