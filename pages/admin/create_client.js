import React from 'react'


import Product from "layouts/Product.js";
import CardCreateClient from "components/Cards/CardCreateClient"

export default function CreateClient(){
  return(
    <>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardCreateClient />
        </div>
      </div>
    </>
  )
}

CreateClient.layout = Product