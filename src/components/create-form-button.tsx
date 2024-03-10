"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  formSchema,
  type FormSchemaType
} from "@/schemas/form-schemas";
import { createForm } from "@/actions/form-actions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const CreateFormButton = () => {

  const router = useRouter();

  const formHook = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: FormSchemaType) => {
    try {

      const formId = await createForm(values);

      toast.success('Form created.');

      router.push(`/builder/${formId}`);
    } catch (error) {
      toast.error('Form create failed.');
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button
          variant="outline"
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background"
        >
          <PlusIcon
            className="h-8 w-8 text-muted-foreground group-hover:text-primary"
          />
          <span
            className="font-bold text-xl text-muted-foreground group-hover:text-primary"
          >
            Create new form
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create form
          </DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form
          {...formHook}
        >
          <form
            onSubmit={formHook.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={formHook.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formHook.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <DialogFooter>
            <Button
              onClick={formHook.handleSubmit(handleSubmit)}
              disabled={formHook.formState.isSubmitting}
              className="w-full mt-4"
            >
              {!formHook.formState.isSubmitting ? (
                <span>
                  Save
                </span>
              ) : (
                <Loader2Icon
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormButton