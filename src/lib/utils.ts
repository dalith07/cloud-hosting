export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export type Article = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
