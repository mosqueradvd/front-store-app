import React from 'react'
import Admin from "layouts/Admin.js";


import ListSales from '../../components/List/ListSales'

export default function Sales() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <ListSales color='light' />
        </div>
      </div>
   
    </>
  )
}

Sales.layout = Admin