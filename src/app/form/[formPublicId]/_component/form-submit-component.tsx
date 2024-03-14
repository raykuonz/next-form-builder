"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { Loader2Icon, MousePointerClickIcon } from "lucide-react";
import Confetti from "react-confetti";
import { toast } from "sonner";

import { FormElementInstance } from "@/lib/types";
import { submitForm } from "@/actions/form-actions";
import FormElements from "@/components/form-builder/form-elements";
import { Button } from "@/components/ui/button";

interface FormSubmitComponentProps {
  formPublicId: string;
  name: string;
  description?: string;
  formElements: FormElementInstance[];
}

const FormSubmitComponent = ({
  formPublicId,
  name,
  description,
  formElements
}: FormSubmitComponentProps) => {

  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState<number>(new Date().getTime());
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of formElements) {
      const value = formValues.current[field.id] || '';
      const valid = FormElements[field.type].checkValidity(field, value);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [formElements]);

  const updateFormValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  } ,[]);

  const handleSubmit = async () => {
    formErrors.current = {};

    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast.error('Form has error.');
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);

      await submitForm(formPublicId, jsonContent);

      setIsSubmitted(true);

      toast.success('Form submitted');
    } catch (error) {
      toast.error('Failed to submit the form.');
    }
  }

  if (isSubmitted) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div
          className="flex justify-center w-full h-full items-center p-8"
        >
          <div
            className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
          >
            <h1
              className="text-2xl font-bold"
            >
              Form submitted
            </h1>
            <p
              className="text-muted-foreground"
            >
              Thank you for submitting the form, you can close this page now.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className="flex justify-center w-full h-full items-center p-8"
    >
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        <div className="flex flex-col gap-1 mb-2">
          <h1
            className="text-2xl font-bold"
          >
            {name}
          </h1>
          {description && (
            <p
              className="text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>
        {formElements.map((element) => {

          const FormElement = FormElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              isInvalid={formErrors.current[element.id]}
              onValueChange={updateFormValue}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}

        <Button
          className="mt-8"
          disabled={isSubmitting}
          onClick={() => {
            startTransition(handleSubmit);
          }}
        >
          <MousePointerClickIcon
            className="w-4 h-4 mr-2"
          />
          {isSubmitting ? 'Submitting' : 'Submit'}
          {isSubmitting && (
            <Loader2Icon
              className="w-4 h-4 ml-2 animate-spin"
            />
          )}
        </Button>
      </div>
    </div>
  )
}

export default FormSubmitComponent