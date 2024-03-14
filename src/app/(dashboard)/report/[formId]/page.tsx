import { getFormById } from "@/actions/form-actions";
import VisitButton from "./_components/visit-button";
import ShareLink from "./_components/share-link";
import StatsCardList from "../../_components/stats-card-list";
import SubmissionsTable from "./_components/submissions-table";

interface ReportPageProps {
  params: {
    formId: string;
  };
}

const ReportPage = async ({
  params
}: ReportPageProps) => {

  const form = await getFormById(parseInt(params.formId));

  if (!form) {
    throw new Error('Form not found');
  }

  const visits = form.visits || 0;
  const submissions = form.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <div
      className="py-10 border-b border-muted"
    >
      <div
        className="flex justify-between container"
      >
        <h1
          className="text-4xl font-bold truncate"
        >
          {form.name}
        </h1>
        <VisitButton
          formPublicId={form.shareUrl}
        />
      </div>
      <div
        className="py-4 border-b border-muted"
      >
        <div
          className="container flex items-center justify-between gap-2"
        >
          <ShareLink
            formPublicId={form.shareUrl}
          />
        </div>
      </div>
      <div
        className="w-full gap-4 container"
      >
        <StatsCardList
          data={{
            visits,
            submissions,
            submissionRate,
            bounceRate,
          }}
          loading={false}
        />
      </div>

      <div
        className="container pt-10"
      >
        <SubmissionsTable
          formId={form.id}
        />
      </div>
    </div>
  )
}

export default ReportPage;