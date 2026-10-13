export const PRODUCT_CATEGORIES = [
  { id: "abarrotes", name: "Abarrotes", icon: "🛒" },
  { id: "bebidas", name: "Bebidas", icon: "🥤" },
  { id: "aseo", name: "Aseo", icon: "🧼" },
  { id: "lacteos", name: "Lácteos", icon: "🥛" },
  { id: "snacks", name: "Snacks", icon: "🍿" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["id"];
