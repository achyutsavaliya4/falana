export interface FacilityStoreDetail {
  id: number;
  key: string;
  value: string;
  is_active: boolean;
}

export interface FacilityItem {
  id: number;
  tenant_id: number;
  name: string;
  slug: string;
  is_active: boolean;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string; 
  pincode: string;
  details: FacilityStoreDetail[];
}

export interface Facility {
  id: number;
  tenant_id: number;
  name: string;
  slug: string;
  is_active: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  latitude: string;    
  longitude: string;   
  pincode: string;
}

export interface FacilityEnum{
  id: number,
  key: string,
  is_active: boolean
}