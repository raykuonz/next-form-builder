"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormElementInstance,
  SpacerFieldInstance,
} from "@/lib/types";
import useDesigner from "@/hooks/use-designer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const propertiesSchema = z.object({
  height: z.number().min(2).max(200),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {

  const element = elementInstance as SpacerFieldInstance;

  const { height } = element.extraAttributes;

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      height,
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
          name="height"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Height (px): {form.watch('height')}
              </FormLabel>
              <FormControl
                className="pt-2"
              >
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
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