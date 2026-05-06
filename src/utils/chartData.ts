import type { UserAnalytics } from "./types";

export interface PieChartData {
  name: string;
  value: number;
  percentage: number;
}

export interface BarChartData {
  name: string;
  count: number;
}

export const formatGenderChartData = (
  analytics: UserAnalytics,
): PieChartData[] => {
  return [
    {
      name: "Male",
      value: analytics.genderDistribution.Male,
      percentage: analytics.malePercentage,
    },
    {
      name: "Female",
      value: analytics.genderDistribution.Female,
      percentage: analytics.femalePercentage,
    },
  ];
};

export const formatAgeRangeChartData = (
  analytics: UserAnalytics,
): BarChartData[] => {
  return analytics.ageRanges.map((range) => ({
    name: range.range,
    count: range.count,
  }));
};

export const formatCountryChartData = (
  analytics: UserAnalytics,
): BarChartData[] => {
  return analytics.countryDistribution.map((country) => ({
    name: country.country,
    count: country.count,
  }));
};
