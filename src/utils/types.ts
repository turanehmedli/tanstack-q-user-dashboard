export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  image?: string;
  age: number;
  gender: "male" | "female" | "other";
  address: {
    country?: string;
  };
  company?: {
    name?: string;
  };
  role?: "Admin" | "Editor" | "Viewer";
  status?: "Active" | "Inactive";
}

export interface GenderDistribution {
  Male: number;
  Female: number;
}

export interface AgeRangeData {
  range: string;
  count: number;
}

export interface CountryData {
  country: string;
  count: number;
}

export interface UserAnalytics {
  totalUsers: number;
  averageAge: number;
  genderDistribution: GenderDistribution;
  ageRanges: AgeRangeData[];
  countryDistribution: CountryData[];
  malePercentage: number;
  femalePercentage: number;
}
