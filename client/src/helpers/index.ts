export function cleanSpaces(item: string) {
  return item.trim();
}

export const regexSsn = /^\d{3}-\d{2}-\d{4}$/;

export const isValidSsn = (ssn: string) => regexSsn.test(ssn);
