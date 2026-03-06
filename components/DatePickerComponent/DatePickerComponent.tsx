"use client";
import { memo } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.min.css";
import Image from "next/image";
import clsx from "clsx";

export type Props = {
  field: any;
  fieldIndex?: number;
  fieldData: any;
  fullFieldData: any;
  onSelectDate?: any;
};

const DatePickerComponent = ({
  field,
  fieldIndex,
  fieldData,
  fullFieldData,
  onSelectDate,
}: Props) => {
  return (
    <div className="primary-date-wrapper">
      <DatePicker
        id={field?.id ?? field?.fieldName}
        key={"date" + fieldIndex + field?.fieldName}
        ref={field.ref ?? null}
        value={fieldData?.[field?.fieldName]}
        multiple={false}
        range={field?.range ?? false}
        numberOfMonths={field?.numberOfMonths ?? 1}
        currentDate={new DateObject(field?.currentDate) ?? new DateObject()}
        onChange={(date: any) => {
          onSelectDate?.(
            field?.showTime ? date?.format(field?.dateFormat) : date,
            field,
          );
        }}
        disabled={
          field?.isDisabled ||
          (field?.onDisabled
            ? field?.onDisabled(field, fieldData, fullFieldData)
            : false)
        }
        placeholder={field.placeholder ?? "Date"}
        containerClassName={clsx("primary-date", field?.calendarClassName)}
        format={field?.dateFormat ?? "YYYY-MM-DD"}
        rangeHover={field?.rangeHover ?? true}
        maxDate={field?.maxDate ?? ""}
        minDate={field?.minDate ?? ""}
      />
      <label
        className={`${field?.datepickerLabelClassName ?? ""}`}
        htmlFor={field?.htmlFor ?? "date"}
      >
        <Image
          height={24}
          width={24}
          alt="Date Picker"
          src={
            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
            "/icons/calendar-nacy-blue.svg"
          }
          className={clsx("calender-icon", field?.datePickerIconClassName)}
          unoptimized
        />
      </label>
    </div>
  );
};

export default memo(DatePickerComponent);
