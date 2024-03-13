"use client";

import { useEffect, useState } from "react";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShareLinkProps {
  formPublicId: string;
}

const ShareLink = ({
  formPublicId,
}: ShareLinkProps) => {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const shareLink = `${window.location.origin}/form/${formPublicId}`;

  return (
    <div
      className="flex flex-grow gap-4 items-center"
    >
      <Input
        className="w-full"
        readOnly
        value={shareLink}
      />
      <Button
        onClick={() => {
          try {
            navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied.');
          } catch (error) {
            toast.error('Link copy failed.')
          }
        }}
      >
        <CopyIcon
          className="w-4 h-4 mr-2"
        />
        Copy link
      </Button>
    </div>
  )
}

export default ShareLink