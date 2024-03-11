import { ScanEyeIcon } from "lucide-react"

import { Button } from "../ui/button"

const PreviewDialogButton = () => {
  return (
    <Button
      variant="outline"
      className="gap-2"
    >
      <ScanEyeIcon
        className="w-4 h-4"
      />
      Preview
    </Button>
  )
}

export default PreviewDialogButton