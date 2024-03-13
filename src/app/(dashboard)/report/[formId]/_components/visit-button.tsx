"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface VisitButtonProps {
  formPublicId: string;
}

const VisitButton = ({
  formPublicId,
}: VisitButtonProps) => {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const shareLink = `${window.location.origin}/form/${formPublicId}`;

  const handleVisit = () => {
    window.open(shareLink, '_blank');
  }

  return (
    <Button
      onClick={handleVisit}
      className="w-[200px]"
    >
      Visit
    </Button>
  )
}

export default VisitButton