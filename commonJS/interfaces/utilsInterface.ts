export type DefaultFunction<Field, Return> = (
  field: Field,
  fieldData: any,
  fullFieldData: any,
  configData: any
) => Return;

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  current_page_record: number;
}
