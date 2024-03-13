interface SubmissionsTableProps {
  formId: number;
}

const SubmissionsTable = ({
  formId,
}: SubmissionsTableProps) => {
  return (
    <>
      <h2
        className="text-2xl font-bold my-4"
      >
        Submissions
      </h2>
    </>
  )
}

export default SubmissionsTable