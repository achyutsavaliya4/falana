import Button from "../Button/Button";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import Input from "../Input/Input";
import Label from "../Label/Label";
import Select from "../Select/Select";
import Switch from "../Switch/Switch";
import TextArea from "../TextArea/TextArea";
import SearchableSelect from "../SearchableSelect/SearchableSelect";

export type Props = {
  field: any;
  fieldIndex: number;
  fieldData: any;
  fullfieldData: any;
  configData: any;
  onChangeInput?: any;
  onBlurInput?: any;
  onClickField?: any;
  onChangeSelect?: any;
  onSelectDate?: any;
  onChangeSwitch?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => void;
  onChangeSearch?: any;
  onSearchSelect?: any;
  onRemoveSelect?: any;
  isCheckValid?: boolean;
  errors?: any;
  repeatIndex?: number;
  repeatFieldName?: string;
  repeatChildIndex?: number;
  nesting: any;
};

const RenderField = ({
  field,
  fieldIndex,
  fieldData,
  fullfieldData,
  configData,
  onChangeInput,
  onBlurInput,
  onClickField,
  onChangeSelect,
  onSelectDate,
  onChangeSwitch,
  onChangeSearch,
  onSearchSelect,
  onRemoveSelect,
  isCheckValid,
  errors,
  repeatChildIndex,
  nesting,
}: Props) => {
  switch (field?.fieldType) {
    case "input":
      return (
        <Input
          field={field}
          fieldIndex={fieldIndex}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          configData={configData}
          onChangeInput={onChangeInput}
          onBlurInput={onBlurInput}
          repeatChildIndex={repeatChildIndex}
          nesting={nesting}
        />
      );
    case "button":
      return (
        <Button
          field={field}
          fieldIndex={fieldIndex}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          configData={configData}
          onClickField={onClickField}
          repeatChildIndex={repeatChildIndex}
        />
      );
    case "textarea":
      return (
        <TextArea
          field={field}
          fieldIndex={fieldIndex}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          onChangeInput={onChangeInput}
        />
      );
    case "select":
      return (
        <Select
          field={field}
          fieldIndex={fieldIndex}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          configData={configData}
          onChangeSelect={onChangeSelect}
        />
      );
    case "label":
      return (
        <Label
          field={field}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          configData={configData}
        />
      );
    case "date":
      return (
        <DatePickerComponent
          field={field}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          onSelectDate={onSelectDate}
        />
      );
    case "switch":
      return (
        <Switch
          field={field}
          fieldData={fieldData}
          fullFieldData={fullfieldData}
          configData={configData}
          onChangeSwitch={onChangeSwitch}
          fieldIndex={fieldIndex}
        />
      );
    case "searchable-select":
      return (
        <SearchableSelect
          field={field as any}
          fieldIndex={fieldIndex}
          fieldData={fieldData as any}
          fullFieldData={fullfieldData}
          configData={configData as any}
          onChangeSearch={onChangeSearch as any}
          onSearchSelect={onSearchSelect as any}
          onRemoveSelect={onRemoveSelect as any}
          onBlurInput={onBlurInput as any}
          isCheckValid={isCheckValid}
          errors={errors as any}
          isLoading={false}
          repeatChildIndex={repeatChildIndex}
        />
      );
  }
};

export default RenderField;
