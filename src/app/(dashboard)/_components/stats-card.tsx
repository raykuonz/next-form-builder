import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  title: string;
  helperText: string;
  value: string;
  loading: boolean;
  icon: ReactNode;
  className: string;
}

const StatsCard = ({
  title,
  helperText,
  value,
  loading,
  icon,
  className,
}: StatsCardProps) => {
  return (
    <Card
      className={className}
    >
      <CardHeader
        className="flex flex-row justify-between items-center pb-2"
      >
        <CardTitle
          className="text-sm font-medium text-muted-foreground"
        >
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div
          className="text-2xl font-bold"
        >
          {loading && (
            <Skeleton>
              <span
                className="opacity-0"
              >
                0
              </span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p
          className="text-xs text-muted-foreground pt-1"
        >
          {helperText}
        </p>
      </CardContent>
    </Card>
  )
}

export default StatsCard