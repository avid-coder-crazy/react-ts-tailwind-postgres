//priceTable.tsx
import React, { useEffect } from "react";
import { Customization } from "../hooks/useCustomizer.tsx";
interface Props {
  data: Customization;
  update: <K extends keyof Customization>(
    key: K,
    value: Customization[K]
  ) => void;
}

const PriceTable: React.FC<Props> = ({data, update}) => {
  // const totalPrice = calculatePrice(data, update);

  return (
    <div className="overflow-x-auto  rounded-box border border-base-content/5 bg-base-100 full-width">
      <table className="table">
        <thead>
          <tr>  
            <th className="border border-gray-300 w-2/5"></th>
            <th className="border border-gray-300 text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 w-2/5 text-center">
              Base Price
            </td>
            {/* <td className="border border-gray-300 text-center">{(price.basePrice * rates[data.currency]).toFixed(2)}+{data.currency}</td> */}
            <td className="border border-gray-300 text-center">{Number(data.basePrice)?.toFixed(2) || '0.00'}+{data.currency}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 w-2/5 text-center">
              Comment Price
            </td>
            <td className="border border-gray-300 text-center">{(data?.commentPrice ?? 0).toFixed(2)} +{data.currency}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 w-2/5 text-center">
              Image Upload Price
            </td>
            <td className="border border-gray-300 text-center">{(data?.imagePrice ?? 0).toFixed(2)} +{data.currency}</td>
          </tr>
          <tr className="bg-gray-400">
            <td className="border border-gray-300  w-2/5 text-center text-lg font-bold">
              Total Price
            </td>
            <td className="border border-gray-300 text-center text-lg font-bold">{data.totalPrice} +{data.currency}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

export default PriceTable;
