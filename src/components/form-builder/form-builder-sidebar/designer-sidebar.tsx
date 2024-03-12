"use client";

import useDesigner from '@/hooks/use-designer'
import FormElementsSidebar from './form-elements-sidebar';
import PropertiesSidebar from './properties-sidebar';

const DesignerSidebar = () => {

  const { selectedElement } = useDesigner();

  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full"
    >
      {!selectedElement ? (
        <FormElementsSidebar />
      ) : (
        <PropertiesSidebar />
      )}
    </aside>
  )
}

export default DesignerSidebar