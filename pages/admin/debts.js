import React from 'react'
import Admin from "layouts/Admin.js";


import ListDebts from '../../components/List/ListDebts'

export default function Debts() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <ListDebts color='light' />
        </div>
      </div>
   
    </>
  )
}

Debts.layout = Admin