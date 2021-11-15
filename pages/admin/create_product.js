import React from "react";

// components

import CardCreateProduct from "components/Cards/CardCreateProduct.js";

// layout for page

import Product from "layouts/Product.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardCreateProduct />
        </div>
      </div>
    </>
  );
}

Settings.layout = Product;
