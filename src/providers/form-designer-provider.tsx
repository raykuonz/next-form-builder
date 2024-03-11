"use client";

import {
  ReactNode,
  createContext,
  useState,
} from "react";

import { FormElementInstance } from "@/lib/types";

interface FormDesignerContextProps {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
}

interface FormDesignerProviderProps {
  children: ReactNode;
}

export const FormDesignerContext = createContext<FormDesignerContextProps | null>(null);

const FormDesignerProvider = ({
  children
}: FormDesignerProviderProps) => {

  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    })
  }

  const removeElement = (id: string) => {
    setElements((prev) => {
      return prev.filter((element) => element.id !== id);
    })
  }

  return (
    <FormDesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
      }}
    >
      {children}
    </FormDesignerContext.Provider>
  );
}

export default FormDesignerProvider;