"use client";

import { useState } from 'react';
import {
  Active,
  DragOverlay,
  useDndMonitor,
} from '@dnd-kit/core';

import { ElementsType } from '@/lib/types';
import useDesigner from '@/hooks/use-designer';
import SidebarButtonElement from './form-builder-sidebar/sidebar-button-element';
import FormElements from './form-elements';
import DesignerElementWrapper from './designer-element-wrapper';

const DragOverLayWrapper = () => {

  const { elements } = useDesigner();

  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>No drag overlay</div>

  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = <SidebarButtonElement.DragOverlay formElement={FormElements[type]}/>
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) {
      node = <div>Element not found</div>
    } else {
      node = <DesignerElementWrapper.DragOverlay element={element} />
    }
  }

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  )
}

export default DragOverLayWrapper