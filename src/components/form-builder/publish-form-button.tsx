"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2Icon,
  SendIcon,
} from "lucide-react";

import { publishForm } from "@/actions/form-actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface PublishFormbuttonProps {
  formId: number;
}

const PublishFormbutton = ({
  formId,
}: PublishFormbuttonProps) => {

  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const handlePublish = async () => {
    try {
      await publishForm(formId);
      toast.success('Form published.');
      router.refresh();
    } catch (error) {
      toast.error('Form publish failed.');
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
      >
        <Button
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <SendIcon
            className="w-4 h-4"
          />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Publish form
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After published the form will no longer be editable. <br /><br />
            <span
              className="font-medium"
            >
              By publishing this form you will make it available to public to collect submission.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(handlePublish);
            }}
          >
            {loading ? 'Publishing' : 'Publish'}
            {loading && (
              <Loader2Icon
                className="w-4 h-4 ml-2 animate-spin"
              />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormbutton