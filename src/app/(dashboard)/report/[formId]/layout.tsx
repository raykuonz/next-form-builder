import { ReactNode } from 'react';

interface ReportLayoutProps {
  children: ReactNode;
}

const ReportLayout = ({
  children,
}: ReportLayoutProps) => {
  return (
    <div
      className="flex flex-col w-full flex-grow mx-auto"
    >
      {children}
    </div>
  )
}

export default ReportLayout;