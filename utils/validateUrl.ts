export const validateUrl = (input: unknown): string => {
  if (typeof input !== "string") throw new Error("URL must be a string");
  const parsed = new URL(input);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http/https URLs are allowed");
  }
  return parsed.href;
}