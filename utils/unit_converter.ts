import type { AllowedConversions, FromUnit, ToUnit } from "@/types";

export const getConversionDirection = <U extends FromUnit>(from: U, to: ToUnit<U>) => {
  return `${from} -> ${to}` as AllowedConversions;
};

const unitConverter = <U extends FromUnit>(from: U, to: ToUnit<U>, value: number) => {
  const conversionDirection = getConversionDirection(from, to);

  if (
    (conversionDirection === "mg -> g" || conversionDirection === "g -> kg" || conversionDirection === "ml -> l") &&
    value > 0.1
  ) {
    return {
      unit: to,
      value: value / 1000,
    };
  }

  if ((conversionDirection === "kg -> g" || conversionDirection === "l -> ml") && value < 10000) {
    return {
      unit: to,
      value: value * 1000,
    };
  }

  return {
    unit: from,
    value,
  };
};

export default unitConverter;
