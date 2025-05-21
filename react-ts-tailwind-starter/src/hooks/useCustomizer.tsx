//useCustomizer.tsx
import { useState, useCallback } from "react";

export type ProductType = "tshirt" | "sweater";
export type MaterialType = "light cotton" | "heavy cotton($3)";
export type Color = "black" | "white" | "green" | "red" | "pink" | "yellow";

export interface Customization {
  product: ProductType;
  material?: MaterialType; // only for t-shirts
  color: Color;
  comment: string;
  image?: File;
  currency: "USD" | "CAD" | "EUR";
  basePrice ?: number;
  commentPrice ?: number;
  imagePrice ?: number;
  totalPrice ?: number;
}
export type UpdateType = <K extends keyof Customization>(key: K, value: Customization[K]) => void;

export const useCustomizer = () => {
  const [data, setData] = useState<Customization>({
    product: "tshirt",
    material: "light cotton",
    color: "black",
    comment: "",
    currency: "USD",
    basePrice: 16.95,
    commentPrice: 0,
    imagePrice: 0
  });
 const update = useCallback(
    <K extends keyof Customization>(key: K, value: Customization[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    }, []);
    const wholeUpdate =(data : Customization) => {
      setData(data);
    }
    return { customization: data, update, wholeUpdate };
};
