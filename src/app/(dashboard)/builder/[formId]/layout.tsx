import { ReactNode } from 'react';

interface BuilderLayoutProps {
  children: ReactNode;
}

const BuilderLayout = ({
  children,
}: BuilderLayoutProps) => {
  return (
    <div
      className="flex w-full flex-grow mx-auto"
    >
      {children}
    </div>
  )
}

export default BuilderLayout;