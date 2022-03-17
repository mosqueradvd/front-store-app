import React from 'react'

// components

// layout for page

import Product from 'layouts/Product.js'
import Payment from 'components/Cards/Payment'
import Admin from 'layouts/Admin.js'
export default function PaymentDebts() {
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-8/12 px-4'>
          <Payment />
        </div>
      </div>
    </>
  )
}

PaymentDebts.layout = Admin
