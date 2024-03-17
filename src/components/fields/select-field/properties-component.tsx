"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusIcon, XIcon } from "lucide-react";

import {
  FormElementInstance,
  SelectFieldInstance,
} from "@/lib/types";
import useDesigner from "@/hooks/use-designer";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {s
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SelectFieldInstance;

  const {
    label,
    helperText,
    required,
    placeholder,
    options,
  } = element.extraAttributes;

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      required,
      placeholder,
      options,
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
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({field}) => (
            <FormItem>
              <div
                className="flex items-center justify-between"
              >
                <FormLabel>
                  Options
                </FormLabel>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue(
                      'options',
                      field.value.concat('New option'),
                    );
                  }}
                >
                  <PlusIcon
                    className="h-4 w-4 mr-2"
                  />
                  Add
                </Button>
              </div>
              <div
                className="flex flex-col gap-2"
              >
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();

                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <XIcon
                        className="w-4 h-4"
                      />
                    </Button>
                  </div>
                ))}
              </div>

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

export default PropertiesComponent;