import { describe, expect, it } from "vitest";
import { getFriendlyAuthError } from "./authErrors";

describe("authErrors Utility", () => {
  it("returns user-friendly message for invalid credentials", () => {
    const error = new Error("Invalid login credentials");
    expect(getFriendlyAuthError(error)).toBe("The email or password you entered is incorrect.");
  });

  it("returns user-friendly message for already registered user", () => {
    const error = "User already registered";
    expect(getFriendlyAuthError(error)).toBe("An account with this email address already exists.");
  });

  it("returns user-friendly message for unconfirmed email", () => {
    const error = { message: "Email not confirmed" };
    expect(getFriendlyAuthError(error)).toBe("Please verify your email address before signing in.");
  });

  it("returns user-friendly message for short passwords", () => {
    const error = new Error("Password should be at least 6 characters");
    expect(getFriendlyAuthError(error)).toBe("Your password must be at least 6 characters long.");
  });

  it("returns user-friendly message for rate limiting", () => {
    const error = "Too many requests";
    expect(getFriendlyAuthError(error)).toBe("Too many requests. Please try again in a few minutes.");
  });

  it("handles null or empty error inputs gracefully", () => {
    expect(getFriendlyAuthError(null)).toBe("An unknown authentication error occurred.");
    expect(getFriendlyAuthError(undefined)).toBe("An unknown authentication error occurred.");
  });

  it("passes through unmapped custom error messages", () => {
    const customError = new Error("Custom server database connection timeout");
    expect(getFriendlyAuthError(customError)).toBe("Custom server database connection timeout");
  });
});
