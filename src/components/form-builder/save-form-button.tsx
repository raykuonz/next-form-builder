import { SaveIcon } from 'lucide-react';

import { Button } from '../ui/button';

const SaveFormButton = () => {
  return (
    <Button
      variant="outline"
      className="gap-2"
    >
      <SaveIcon
        className="w-4 h-4"
      />
      Save
    </Button>
  )
}

export default SaveFormButton