import React from 'react'
import Admin from "layouts/Admin.js";


import ListClients from '../../components/List/ListClients'

export default function Clients() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <ListClients color='light' />
        </div>
      </div>
   
    </>
  )
}

Clients.layout = Admin