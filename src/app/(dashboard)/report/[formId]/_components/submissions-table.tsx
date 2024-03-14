import { formatDistance } from "date-fns";

import {
  ElementsType,
  FormElementInstance
} from "@/lib/types";
import { getFormWithSubmissions } from "@/actions/form-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubmissionsTableCell from "./submissions-table-cell";

interface SubmissionsTableProps {
  formId: number;
}

interface TableColumns {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
}

const SubmissionsTable = async ({
  formId,
}: SubmissionsTableProps) => {

  const form = await getFormWithSubmissions(formId);

  if (!form) {
    throw new Error('Form not found');
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: TableColumns[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  return (
    <>
      <h2
        className="text-2xl font-bold my-4"
      >
        <div
          className="rounded-md border"
        >
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    className="uppercase"
                    key={column.id}
                  >
                    {column.label}
                  </TableHead>
                ))}
                <TableHead
                  className="text-right uppercase"
                >
                  Submitted at
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {form.formSubmissions.map((submission) => {

                const answers = JSON.parse(submission.content);

                return (
                  <TableRow
                    key={submission.id}
                  >
                    {columns.map((column) => (
                      <SubmissionsTableCell
                        key={`${submission.id}_${column.id}`}
                        type={column.type}
                        value={answers[column.id]}
                      />
                    ))}
                    <TableCell
                      className="text-right"
                    >
                      {formatDistance(
                        submission.createdAt,
                        new Date(),
                        { addSuffix: true }
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </h2>
    </>
  )
}

export default SubmissionsTable