import React from 'react'
import Admin from 'layouts/Admin.js'

import Product from 'layouts/Product.js'
import CardReport from 'components/Cards/CardReport'

export default function Report() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <CardReport color='light' />
        </div>
      </div>
    </>
  )
}

Report.layout = Product
