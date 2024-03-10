export function getInitials(name: string): string {
  const words = name.split(" ");
  const initials = words.map((word) => word[0]);
  return initials.join("").toUpperCase();
}
