
export interface ServicePackage {
  name: string;
  price: number;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  packages: ServicePackage[];
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  areas: string[];
  established: number;
  hours: {
    monThu: string;
    friSat: string;
    sun: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
  warranties: string[];
}
