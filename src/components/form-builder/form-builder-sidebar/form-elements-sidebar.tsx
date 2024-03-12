import FormElements from "../form-elements"
import SidebarButtonElement from "./sidebar-button-element"

const FormElementsSidebar = () => {
  return (
    <>
      Elements
      <SidebarButtonElement
        formElement={FormElements.TextField}
      />
    </>
  )
}

export default FormElementsSidebar