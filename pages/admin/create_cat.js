import React from "react";

// components

// layout for page

import Product from "layouts/Product.js";
import CardCreateCategory from "components/Cards/CreateCategory";

export default function CreateCategory() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardCreateCategory />
        </div>
      </div>
    </>
  );
}

CreateCategory.layout = Product;
