import { ElementsType } from '@/lib/types'
import { TableCell } from '@/components/ui/table'

interface SubmissionsTableCellProps {
  type: ElementsType;
  value: string;
}

const SubmissionsTableCell = ({
  type,
  value
}: SubmissionsTableCellProps) => {
  return (
    <TableCell>
      {value}
    </TableCell>
  )
}

export default SubmissionsTableCell