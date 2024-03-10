import Link from "next/link";
import { formatDistance } from "date-fns";
import {
  ArrowRight,
  Edit2Icon,
  MousePointerClickIcon,
  ViewIcon
} from "lucide-react";

import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FormCardProps {
  data: Form;
}

const FormCard = ({
  data
}: FormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="flex items-center gap-2 justify-between"
        >
          <span
            className="truncate font-bold"
          >
            {data.name}
          </span>
          <Badge
            variant={data.published ? 'default' : 'destructive'}
          >
            {data.published ? 'Published' : 'Draft'}
          </Badge>
        </CardTitle>
        <CardDescription
        	className="flex items-center justify-between text-muted-foreground text-sm"
        >
          {formatDistance(
            data.createdAt,
            new Date(),
            {
              addSuffix: true,
            }
          )}
          {data.published && (
            <span
              className="flex items-center gap-2"
            >
              <ViewIcon
                className="text-muted-foreground"
              />
              <span>
                {data.visits.toLocaleString()}
              </span>
              <MousePointerClickIcon
                className="text-muted-foreground"
              />
              <span>
                {data.submissions.toLocaleString()}
              </span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent
        className="h-[20px] truncate text-sm text-muted-foreground"
      >
        {data.description || 'No description.'}
      </CardContent>
      <CardFooter>
        {data.published ? (
          <Button
            asChild
            className="w-full mt-2 text-md"
          >
            <Link
              href={`/forms/${data.id}`}
            >
              View submissions
              <ArrowRight
                className="w-4 h-4 ml-2"
              />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant="secondary"
            className="w-full mt-2 text-md"
          >
            <Link
              href={`/builder/${data.id}`}
            >
              Edit form
              <Edit2Icon
                className="w-4 h-4 ml-2"
              />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

FormCard.Skeleton = function FormCardSkeletion () {
  return (
    <Skeleton
      className="border-2 border-primary/20 h-[190px] w-full"
    />
  );
}

export default FormCard;