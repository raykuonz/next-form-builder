import { SendIcon } from 'lucide-react';

import { Button } from '../ui/button';

const PublishFormbutton = () => {
  return (
    <Button
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
    >
      <SendIcon
        className="w-4 h-4"
      />
      Publish
    </Button>
  )
}

export default PublishFormbutton