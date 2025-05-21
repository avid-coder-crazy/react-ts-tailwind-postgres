//selector.tsx
import React from "react";
import ImageUploader from "./ImageUploader.tsx";
import { Customization, ProductType } from "../hooks/useCustomizer.tsx";
interface Props {
  data: Customization;
  update: <K extends keyof Customization>(
    key: K,
    value: Customization[K]
  ) => void;
}
const Selector: React.FC<Props> = ({ data, update }) => {
  return (
    <div>
      <div className="flex flex-col">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm">Choose Product</legend>
          <select
            id="product"
            defaultValue={data.product}
            className="select border focus:outline-0 focus:border-blue-500 w-full"
            onChange={(e) => update("product", e.target.value as any)}
          >
            <option disabled={true}>Choose Product</option>
            <option>tshirt</option>
            <option>sweater</option>
          </select>
        </fieldset>
      </div>
      <div className="flex w-full">
        <div className="w-3/5 mr-5">
          <ImageUploader update={update} />
        </div>
        <div className="w-2/5">
          {data.product === ("sweater" as ProductType) ? (
            <select className="select" disabled={true}>
              <option>You can't touch this</option>
            </select>
          ) : (
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Choose Material
              </legend>
              <select
                id="material"
                defaultValue={data.material}
                className="select border focus:outline-0 focus:border-blue-500 w-full"
                onChange={(e) => update("material", e.target.value as any)}
              >
                <option disabled={true}>Choose Material</option>
                <option>light cotton</option>
                <option>heavy cotton(+$3)</option>
              </select>
            </fieldset>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Choose Color</legend>
            <select
              id="color"
              defaultValue={data.color}
              className="select border focus:outline-0 focus:border-blue-500 w-full"
              onChange={(e) => update("color", e.target.value as any)}
            >
              <option disabled={true}>Choose Color</option>
              {data.product === ("tshirt" as ProductType)
                ? ["black", "white", "green", "red"].map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))
                : ["black", "white", "pink", "yellow"].map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Choose Currency</legend>
            <select
              id="currency"
              defaultValue={data.currency}
              className="select border focus:outline-0 focus:border-blue-500 w-full"
              onChange={(e) => update("currency", e.target.value as any)}
            >
              <option disabled={true}>Choose Currency</option>
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Selector;
