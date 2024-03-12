"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { FormElementInstance } from "@/lib/types";

interface FormDesignerContextProps {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

  updateElement: (id: string, element: FormElementInstance) => void;
}

interface FormDesignerProviderProps {
  children: ReactNode;
}

export const FormDesignerContext = createContext<FormDesignerContextProps | null>(null);

const FormDesignerProvider = ({
  children
}: FormDesignerProviderProps) => {

  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

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

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((element) => element.id === id);
      newElements[index] = element;
      return newElements;
    })
  }

  return (
    <FormDesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </FormDesignerContext.Provider>
  );
}

export default FormDesignerProvider;