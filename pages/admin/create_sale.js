import React from 'react'

// components

import CardCreateSale from 'components/Cards/CardCreateSale'

// layout for page

import Product from 'layouts/Product.js'

export default function Settings() {
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-8/12 px-4'>
          <CardCreateSale />
        </div>
      </div>
    </>
  )
}

Settings.layout = Product
