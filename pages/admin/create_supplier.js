import React from 'react'

// components

// layout for page

import Product from 'layouts/Product.js'
import CardCreateSupplier from 'components/Cards/CardCreateSupplier'
import Admin from 'layouts/Admin.js'
export default function CreateSupplier() {
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-8/12 px-4'>
          <CardCreateSupplier />
        </div>
      </div>
    </>
  )
}

CreateSupplier.layout = Admin
