import { ReactNode } from 'react';
import { formatDate } from 'date-fns';

import { ElementsType } from '@/lib/types'
import { TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface SubmissionsTableCellProps {
  type: ElementsType;
  value: string;
}

const SubmissionsTableCell = ({
  type,
  value
}: SubmissionsTableCellProps) => {

  let node: ReactNode = value;

  switch (type) {
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = (
        <Badge
          variant="outline"
        >
          {formatDate(date, 'dd/MM/yyyy')}
        </Badge>
      );
      break;
    case 'CheckboxField':
      const isChecked = value === 'true';
      node = <Checkbox checked={isChecked} disabled />
      break;

    default:
      break;
  }

  return (
    <TableCell>
      {node}
    </TableCell>
  )
}

export default SubmissionsTableCell