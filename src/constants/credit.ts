const PRODUCTION_PACKAGES = [
  { amount: 3000, credits: 3000, bonus: 0, label: "₩3,000" },
  { amount: 5000, credits: 5250, bonus: 5, label: "₩5,000" },
  { amount: 10000, credits: 11000, bonus: 10, label: "₩10,000" },
  { amount: 50000, credits: 60000, bonus: 20, label: "₩50,000" },
];

const TEST_PACKAGE = { amount: 100, credits: 100, bonus: 0, label: "₩100 (테스트)" };

export const CREDIT_PACKAGES = process.env.NODE_ENV === "development"
  ? [TEST_PACKAGE, ...PRODUCTION_PACKAGES]
  : PRODUCTION_PACKAGES;

export const WELCOME_CREDITS = 1000;

export const CREDIT_PRICE_LABELS: Record<number, string> = {
  500: "500",
  1000: "1,000",
  1500: "1,500",
  2000: "2,000",
};
