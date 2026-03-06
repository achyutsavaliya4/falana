export interface FacilityAddFormData {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude: string;
  longitude: string;
  details?: AdditionalField[]
}

export interface AdditionalField{
  key: string,
  value: string
}