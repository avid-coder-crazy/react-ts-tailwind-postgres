// App.tsx
import React, { useEffect } from "react";
import axios from "axios";
import { useCustomizer } from "./hooks/useCustomizer.tsx";
import Selector from "./components/selector.tsx";
import Comment from "./components/comment.tsx";
import PriceTable from "./components/priceTable.tsx";
// import { calculatePrice } from "./utils/priceCalculator.tsx";
import { Customization } from "./hooks/useCustomizer.tsx";
function App() {
  const { customization, update, wholeUpdate } = useCustomizer();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get<{ design: Customization, file : File }>("http://localhost:5000/api/products");
  //     const buffer = result.data.design;
  //     wholeUpdate(buffer);
  //     update("image", result.data.file);
  //     console.log(result.data.file);
  //   };
  //   fetchData();
  // }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    const entryarray = Object.entries(customization);
    entryarray.forEach(([key, value]) => {
      if (key === "image") {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    axios
      .post("http://localhost:5000/api/products/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="w-1/3">
        <Selector data={customization} update={update} />
        <Comment data={customization} update={update} />
        <PriceTable data={customization} update={update} />
        <button className="btn btn-primary mt-4 w-full" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
