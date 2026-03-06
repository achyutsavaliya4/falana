"use client";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { properties, SelectOption } from "@/commonJS/interfaces/canvas";
import QuestionCardWrapper from "../FormManagement/QuestionCardWrapper";
import { onClickFieldResolver } from "../Button/Button";
import Input from "../Input/Input";
import { Option } from "../PriorityDropdown/PriorityDropdown";
import TextArea from "../TextArea/TextArea";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import Select from "../Select/Select";

export function initialValueForField(f: properties) {
  const fa = f as any;
  if (fa.prefill !== undefined && fa.prefill !== null) return fa.prefill;
  if (f.type === "checkbox") return !!fa.prefill;
  if (f.type === "multi_select")
    return Array.isArray(fa.prefill) ? fa.prefill : [];
  if (f.type === "select") return fa.src ?? null;
  if (f.type === "number") return fa.prefill ?? "";
  if (f.type === "date" && fa.prefill_today) return new Date().toISOString();
  return "";
}

/** Very small logic stub now — returns true to render unless conditions block it.
 * You can expand to run your condition engine here.
 */
export function evaluateConditions(
  f: properties,
  fullState: Record<string, any>,
) {
  const cond = f.logic?.conditions ?? null;
  if (!cond) return true; // default allow
  // Implement your condition evaluation here.
  // For now return true so fields show up unless `hidden:true`.
  return true;
}

type FieldRendererProps = {
  field: properties;
  value: string;
  onChange: (id: string, v: any) => void;
  fieldIndex: number;
};

export const FieldRenderer = function FieldRenderer({
  field,
  value,
  onChange,
  fieldIndex,
}: FieldRendererProps) {
  const id = field.id;

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const val: any =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      onChange(id, val);
    },
    [id, onChange],
  );

  switch (field.type) {
    case "text":
    case "email":
    case "url":
    case "phone_number":
    case "number": {
      const fa = field as any;
      const isTextArea = fa?.multi_lines;
      return (
        <div className="re-field">
          {isTextArea ? (
            <TextArea
              field={{
                id,
                fieldName: "input",
                placeholder: field.placeholder,
                disabled: field.disabled,
                className: "re-textarea",
                maxLength: field.max_char_limit,
              }}
              fieldIndex={fieldIndex}
              fieldData={{ input: value }}
              fullFieldData={{ input: value }}
              onChangeInput={handleChange}
            />
          ) : (
            <Input
              field={{
                id,
                fieldName: "input",
                placeholder: field.placeholder ?? undefined,
                isDisabled: field.disabled,
                inputType: field?.type,
                className: "re-input",
              }}
              fieldIndex={fieldIndex}
              fieldData={{ input: value }}
              fullFieldData={{ input: value }}
              configData={{}}
              onChangeInput={handleChange}
            />
          )}
          {field.show_char_limit ? (
            <div className="text-xs text-gray-400 mt-1">
              {(value ?? "").length}/{field.max_char_limit ?? "∞"}
            </div>
          ) : null}
          {field.help && field.help_position !== "above_input" && (
            <div
              className="re-help"
              dangerouslySetInnerHTML={{ __html: field.help }}
            />
          )}
        </div>
      );
    }

    case "date": {
      const withTime = !!field.with_time;
      const inputType = withTime ? "datetime-local" : "date";

      return (
        <div className="mb-4 w-full">
          <DatePickerComponent
            field={{
              id,
              fieldName: "date",
              inputType,
              className: "re-input",
              isDisabled: (field as any).disabled,
              htmlFor: id,
            }}
            fieldData={{ date: toInputDate(value, withTime) }}
            fullFieldData={{ date: toInputDate(value, withTime) }}
            onSelectDate={(date: any) => {
              onChange(id, date);
            }}
          />
          {field.help ? (
            <div
              className="text-sm mt-1 text-gray-400"
              dangerouslySetInnerHTML={{ __html: field.help }}
            />
          ) : null}
        </div>
      );
    }

    case "checkbox": {
      return (
        <div className="re-checkbox">
          <Input
            field={{
              id,
              fieldName: "input",
              placeholder: (field as any).placeholder ?? '',
              isDisabled: (field as any).disabled,
              inputType: "checkbox",
              className: "mr-3",
            }}
            fieldIndex={fieldIndex}
            fieldData={{ input: !!value }}
            fullFieldData={{ input: !!value }}
            configData={{}}
            onChangeInput={(e) => onChange(id, e.target.checked)}
          />
        </div>
      );
    }

    case "select": {
      const options = field.select?.options ?? [];

      return (
        <Select
          field={{
            id,
            fieldName: "select",
            className: "re-select",
          }}
          fieldIndex={fieldIndex}
          fieldData={{ select: value }}
          fullFieldData={{ select: value }}
          configData={{ select: options }}
          onChangeSelect={(e) => onChange(id, e.target.value)}
        />
      );
    }

    case "multi_select": {
      const options = field.multi_select?.options ?? [];

      return (
        <div className="mb-4 w-full">
          <select
            id={id}
            multiple
            value={value ?? []}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(
                (o) => o.value,
              );
              onChange(id, selected);
            }}
            className="re-select"
          >
            {options.map((o: SelectOption) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    case "files": {
      return (
        <div className="mb-4 w-full">
          <Input
            field={{
              id,
              fieldName: "input",
              isDisabled: (field as any).disabled,
              inputType: "file",
              className: "mt-2",
              multiple: !!field.multiple,
              accept: field.allowed_file_types
                ? field.allowed_file_types
                    .split(",")
                    .map((t: string) => "." + t)
                    .join(",")
                : undefined,
            }}
            fieldIndex={fieldIndex}
            fieldData={{ input: !!value }}
            fullFieldData={{ input: !!value }}
            configData={{}}
            onChangeInput={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              onChange(id, files);
            }}
          />
          {field.help ? (
            <div className="text-sm mt-1 text-gray-400">{field.help}</div>
          ) : null}
        </div>
      );
    }

    case "location": {
      return (
        <div className="mb-4 w-full">
          <div className="p-3 border rounded-md">
            <div className="mb-2 text-sm text-gray-400">
              Longitude: {(value as any)?.lng ?? ""}
            </div>
            <div className="mb-2 text-sm text-gray-400">
              Latitude: {(value as any)?.lat ?? ""}
            </div>
            <button
              type="button"
              onClick={() => {
                if (!navigator.geolocation) {
                  alert("Geolocation not available");
                  return;
                }

                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    onChange(id, {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                    });
                  },
                  (err) => alert("Unable to get location: " + err.message),
                );
              }}
              className="px-3 py-1 border rounded"
            >
              Use current location
            </button>
          </div>
        </div>
      );
    }

    case "nf-image": {
      const src = field.src;

      return (
        <div className="mb-4 w-full">
          {field.name ? <div>{field.name}</div> : null}
          {src && (
            <div className="rounded overflow-hidden">
              <Image
                src={src}
                alt={field.alt ?? field.name ?? "image"}
                width={800}
                height={400}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
      );
    }

    case "nf-text": {
      return (
        <div
          className="mb-4 w-full"
          dangerouslySetInnerHTML={{ __html: (field as any).content ?? (field as any).src ?? "" }}
        />
      );
    }

    case "nf-divider": {
      return <hr className="re-divider" />;
    }

    case "nf-page-break": {
      return (
        <div className="re-page-break">
          <button className="re-reset">
            {field.previous_btn_text ?? "Previous"}
          </button>
          <button className="re-submit">{field.next_btn_text ?? "Next"}</button>
        </div>
      );
    }

    default:
      return null;
  }
};

// helper to convert ISO to input-friendly value
function toInputDate(val: any, withTime: boolean) {
  try {
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return "";
    if (withTime) {
      // datetime-local expects "YYYY-MM-DDTHH:mm"
      const off = d.getTimezoneOffset();
      const local = new Date(d.getTime() - off * 60000);
      return local.toISOString().slice(0, 16);
    }
    return d.toISOString().slice(0, 10);
  } catch (e) {
    return "";
  }
}

type RenderEngineProps = {
  schema: properties[];
  onSubmit?: (values: Record<string, any>) => void;
  className?: string;
  onClickFieldQuestionSettings: onClickFieldResolver;

  dropdownValue?: any;
  dropdownOptions?: Option[];
  optionKey?: string;
  optionValue?: string;
  onSelectDropdown?: (value: Option) => void;
  onChangeSwitch?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => void;
};

/**
 * RenderEngine: main exported component. Controlled internally but exposes onSubmit.
 */
export function RenderEngine({
  schema = [],
  onSubmit,
  onClickFieldQuestionSettings,

  dropdownOptions,
  dropdownValue,
  optionKey,
  optionValue,
  onSelectDropdown,
  onChangeSwitch,
}: RenderEngineProps) {
  const isValidSchema = Array.isArray(schema);
  // compute initial state only once
  const initialState = useMemo(() => {
    if (!isValidSchema) {
      return {};
    }
    const s: Record<string, any> = {};
    for (const f of schema) {
      s[f.id] = initialValueForField(f);
    }
    return s;
  }, [schema]);

  const [values, setValues] = useState<Record<string, any>>(initialState);

  const handleChange = useCallback((id: string, val: any) => {
    setValues((prev) => {
      if (prev[id] === val) return prev;
      return { ...prev, [id]: val };
    });
  }, []);

  const visibleFields = useMemo(() => {
    if (!isValidSchema) {
      return {};
    }
    // filter by logic and hidden flags
    return schema.filter((f) => !f.hidden && evaluateConditions(f, values));
  }, [schema, values]);

  const submit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      onSubmit?.(values);
    },
    [onSubmit, values],
  );

  if (!isValidSchema) {
    console.warn("Hey Cummander You Have Not Passes schema as an ARRAY");
    return;
  }

  return (
    <div className="render-engine">
      {Array.isArray(schema) &&
        schema.map(
          (field, index) =>
            !field.hidden && (
              <QuestionCardWrapper
                key={`${field.id}-${index}`}
                type={field.type}
                title={field.name}
                isRequired={(field as any)?.required ?? false}
                // onClickFieldQuestionSettings={onClickFieldQuestionSettings}
                onClickFieldQuestionSettings={(...args: any[]) =>
                  (onClickFieldQuestionSettings as any)?.(...args, index)
                }
                field={{
                  ...field,
                  sectionIndex: index,
                }}
                onSelectDropdown={onSelectDropdown}
                dropdownOptions={dropdownOptions ?? []}
                dropdownValue={dropdownValue}
                optionKey={optionKey}
                optionValue={optionValue}
                onChangeSwitch={(...args: any[]) =>
                  (onChangeSwitch as any)?.(...args, index)
                }
              >
                <FieldRenderer
                  field={field}
                  value={values[field.id]}
                  onChange={handleChange}
                  fieldIndex={index}
                />
              </QuestionCardWrapper>
            ),
        )}
    </div>
  );
}
