import React from 'react'
import ListSuppliers from '../../components/List/ListSuppliers'
import Admin from 'layouts/Admin.js'

export default function Suppliers() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <ListSuppliers color='light' />
        </div>
      </div>
    </>
  )
}

Suppliers.layout = Admin
