import React from 'react'
import ListProducts from '../../components/List/ListProducts'
import Product from 'layouts/Product.js'
import Admin from 'layouts/Admin.js'
export default function Products() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <ListProducts color='light' />
        </div>
      </div>
    </>
  )
}

Products.layout = Admin
