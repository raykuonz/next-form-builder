"use client";

import { useEffect } from "react";
import { TypeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ElementsType, FormElement, FormElementInstance } from "@/lib/types"
import useDesigner from "@/hooks/use-designer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Placeholder value'
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
}

const DesignerComponent = ({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as CustomInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
  } = element.extraAttributes;

  return (
    <div
      className="flex flex-col gap-2 w-full"
    >
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={placeholder}
      />
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

const PropertiesComponent = ({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as CustomInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
  } = element.extraAttributes;

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      required,
      placeholder
    }
  });

  const { updateElement } = useDesigner();

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: propertiesFormSchemaType) => {
     updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      }
     })
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="label"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                label
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. It will be displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Placeholder
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The placeholder of the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Helper text
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({field}) => (
            <FormItem
              className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
            >
              <div
                className="space-y-0.5"
              >
                <FormLabel>
                  Required
                </FormLabel>
                <FormDescription>
                  The helper text of the field. It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                 <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

const TextField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: TypeIcon,
    label: 'Text field'
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: PropertiesComponent,
}

export default TextField;
