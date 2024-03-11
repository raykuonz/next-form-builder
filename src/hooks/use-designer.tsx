"use client";

import { useContext } from "react";

import { FormDesignerContext } from "@/providers/form-designer-provider";

const useDesigner = () => {

  const context = useContext(FormDesignerContext);

  if (!context) {
    throw new Error('useDesigner must be used within a FormDesignerContext')
  }

  return context;
}

export default useDesigner