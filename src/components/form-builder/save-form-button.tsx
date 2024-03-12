"use client";

import { useTransition } from 'react';
import { toast } from 'sonner';
import {
  Loader2Icon,
  SaveIcon,
} from 'lucide-react';

import { updateFormContent } from '@/actions/form-actions';
import useDesigner from '@/hooks/use-designer';
import { Button } from "@/components/ui/button";

interface SaveFormButtonProps {
  formId: number;
}

const SaveFormButton = ({
  formId,
}: SaveFormButtonProps) => {

  const { elements } = useDesigner();

  const [loading, startTransition] = useTransition();

  const handleSave = async () => {
    try {
      const jsonElements = JSON.stringify(elements);

      await updateFormContent(
        formId,
        jsonElements
      );

      toast.success('Form saved');
    } catch (error) {
      toast.error('Failed to save form.');
    }
  }

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => startTransition(handleSave)}
      disabled={loading}
    >
      <SaveIcon
        className="w-4 h-4"
      />
      {loading ? 'Saving' : 'Save'}
      {loading && (
        <Loader2Icon
          className="w-4 h-4 animate-spin"
        />
      )}
    </Button>
  )
}

export default SaveFormButton