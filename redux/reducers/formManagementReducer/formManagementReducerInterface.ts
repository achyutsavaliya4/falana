import {
  formListItem,
  FormListLinks,
  FormListMeta,
} from "@/redux/sagas/handlers/formManagementHandler/formManagementHandlerInterface";

export interface FormManagementState {
  formsList: formListItem[];
  formsMeta: FormListMeta | Record<string, never>;
  formsLinks: FormListLinks | Record<string, never>;
}
