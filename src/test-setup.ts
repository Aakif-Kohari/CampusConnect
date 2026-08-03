import { vi, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { toHaveNoViolations } from "jest-axe";

// Extend Vitest expect with jest-dom matchers
expect.extend(matchers);

// Extend Vitest with jest-axe custom matcher
expect.extend(toHaveNoViolations);

vi.mock("tailwind-merge", () => ({
  twMerge: (...args: string[]) => args.filter(Boolean).join(" "),
}));
