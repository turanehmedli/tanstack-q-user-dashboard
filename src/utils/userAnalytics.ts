import type {
  User,
  UserAnalytics,
  GenderDistribution,
  AgeRangeData,
  CountryData,
} from "./types";

export const getAgeRange = (age: number): string => {
  if (age >= 7 && age <= 17) return "7-17";
  if (age >= 18 && age <= 25) return "18-25";
  if (age >= 26 && age <= 35) return "26-35";
  if (age >= 36 && age <= 50) return "36-50";
  return "50+";
};

export const calculateUserAnalytics = (users: User[]): UserAnalytics => {
  if (users.length === 0) {
    return {
      totalUsers: 0,
      averageAge: 0,
      genderDistribution: { Male: 0, Female: 0 },
      ageRanges: [],
      countryDistribution: [],
      malePercentage: 0,
      femalePercentage: 0,
    };
  }

  // Total users
  const totalUsers = users.length;

  // Average age
  const totalAge = users.reduce((sum, user) => sum + (user.age || 0), 0);
  const averageAge = Math.round((totalAge / totalUsers) * 10) / 10;

  // Gender distribution
  const genderDistribution: GenderDistribution = {
    Male: 0,
    Female: 0,
  };

  users.forEach((user) => {
    if (user.gender === "male") {
      genderDistribution.Male++;
    } else if (user.gender === "female") {
      genderDistribution.Female++;
    }
  });

  const malePercentage = Math.round(
    (genderDistribution.Male / totalUsers) * 100,
  );
  const femalePercentage = Math.round(
    (genderDistribution.Female / totalUsers) * 100,
  );

  // Age ranges
  const ageRangeMap: { [key: string]: number } = {
    "7-17": 0,
    "18-25": 0,
    "26-35": 0,
    "36-50": 0,
    "50+": 0,
  };

  users.forEach((user) => {
    const range = getAgeRange(user.age);
    ageRangeMap[range]++;
  });

  const ageRanges: AgeRangeData[] = Object.entries(ageRangeMap).map(
    ([range, count]) => ({
      range,
      count,
    }),
  );

  // Country distribution
  const countryMap: { [key: string]: number } = {};

  users.forEach((user) => {
    const country = user.address?.country || "Unknown";
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const countryDistribution: CountryData[] = Object.entries(countryMap)
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 countries

  return {
    totalUsers,
    averageAge,
    genderDistribution,
    ageRanges,
    countryDistribution,
    malePercentage,
    femalePercentage,
  };
};
