import {
  ElementType,
  FC
} from "react";

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField';

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

export type TextAreaFieldExtraAttributes = {
  label: string;
  helperText: string;
  required: boolean,
  placeholder: string;
  rows: number;
}

export type TextAreaFieldInstance = FormElementInstance & {
  extraAttributes: TextAreaFieldExtraAttributes;
}

export type NumberFieldExtraAttributes = {
  label: string;
  helperText: string;
  required: boolean,
  placeholder: string;
}

export type NumberFieldInstance = FormElementInstance & {
  extraAttributes: NumberFieldExtraAttributes;
}

export type DateFieldExtraAttributes = {
  label: string;
  helperText: string;
  required: boolean,
}

export type DateFieldInstance = FormElementInstance & {
  extraAttributes: DateFieldExtraAttributes;
}

export type SelectFieldExtraAttributes = {
  label: string;
  helperText: string;
  required: boolean,
  placeholder: string;
  options: string[];
}

export type SelectFieldInstance = FormElementInstance & {
  extraAttributes: SelectFieldExtraAttributes;
}

export type CheckboxFieldExtraAttributes = {
  label: string;
  helperText: string;
  required: boolean;
}

export type CheckboxFieldInstance = FormElementInstance & {
  extraAttributes: CheckboxFieldExtraAttributes;
}

export type TitleFieldExtraAttributes = {
  label: string;
}

export type TitleFieldInstance = FormElementInstance & {
  extraAttributes: TitleFieldExtraAttributes;
}

export type SubTitleFieldExtraAttributes = {
  label: string;
}

export type SubTitleFieldInstance = FormElementInstance & {
  extraAttributes: SubTitleFieldExtraAttributes;
}

export type ParagraphFieldExtraAttributes = {
  label: string;
}

export type ParagraphFieldInstance = FormElementInstance & {
  extraAttributes: ParagraphFieldExtraAttributes;
}

export type SpacerFieldExtraAttributes = {
  height: number;
}

export type SpacerFieldInstance = FormElementInstance & {
  extraAttributes: SpacerFieldExtraAttributes;
}
