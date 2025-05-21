// priceCalculator.tsx
import { Customization, UpdateType } from "../hooks/useCustomizer";
import React, { useEffect } from "react";
import useExchangeRates from "../hooks/useExchangeRate.tsx";
type MaterialType = "heavy cotton(+$3)" | "light cotton" | "polyester";

export const calculatePrice = (
  c: Customization,
  update: UpdateType,
): void => {
  const { rates, loading } = useExchangeRates();

  useEffect(() => {
    if (c.product === "tshirt") {
      c.basePrice = ["black", "white"].includes(c.color) ? 16.95 : 18.95;
      parseFloat((c.basePrice * rates[c.currency]).toFixed(2));
      if (c.material === ("heavy cotton(+$3)" as MaterialType)) {
        c.basePrice += 3;
        let buffer = parseFloat((c.basePrice * rates[c.currency]).toFixed(2));
        update("basePrice", buffer);
      }
    } else {
      c.basePrice = ["black", "white"].includes(c.color) ? 28.95 : 32.95;
      update(
        "basePrice",
        parseFloat((c.basePrice * rates[c.currency]).toFixed(2))
      );
    }

    if (c.comment.length > 8) {
      c.commentPrice = 5;
      parseFloat((c.commentPrice * rates[c.currency]).toFixed(2));
      update(
        "commentPrice",
        parseFloat((c.commentPrice * rates[c.currency]).toFixed(2))
      );
    }
    if (c.image) {
      c.imagePrice = 10;
      parseFloat((c.imagePrice * rates[c.currency]).toFixed(2));
      update(
        "imagePrice",
        parseFloat((c.imagePrice * rates[c.currency]).toFixed(2))
      );
    }
    c.totalPrice = c.basePrice + (c.commentPrice ?? 0) + (c.imagePrice ?? 0);
    update(
      "totalPrice",
      c.basePrice + (c.commentPrice ?? 0) + (c.imagePrice ?? 0)
    );
  }, [
    c.product,
    c.material,
    c.color,
    c.comment,
    c.image,
    c.currency,
    rates,
    // loading,
  ]);

};
