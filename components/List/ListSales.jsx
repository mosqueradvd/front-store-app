import React, { useEffect, useState } from 'react'
import moment from 'moment'
import TableDropdown from 'components/Dropdowns/TableDropdown.js'
import Pagination from '@material-tailwind/react/Pagination'
import PaginationItem from '@material-tailwind/react/PaginationItem'
import Icon from '@material-tailwind/react/Icon'
export default function ListSales({ color }) {
  const [sales, setSales] = useState([])

  let dataSet = []
  useEffect(() => {
    getSales()
  }, [])
  const getSales = async () => {
    const resp = await fetch('http://localhost:4000/api/sales/get-sales', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    console.log('Sales', data.sales)
    console.log('Clients', data.clients)

    for (let i = 0; i < data.sales.length; i++) {
      if (data.sales[i].id_client == data.clients[i].id) {
        dataSet.push({
          id: data.sales[i].id,
          date: data.sales[i].date_sale,
          total_sale: data.sales[i].total_sale,
          client: data.clients[i].name + ' ' + data.clients[i].lastname,
          phone: data.clients[i].phone,
          description: data.sales[i].description,
        })
      }
    }
    setSales(dataSet)
    console.log('SaleClient', dataSet)
  }

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
        }
      >
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'></div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Nombre
                </th>

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Concepto
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Fecha de venta
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Valor Venta
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Telefono
                </th>

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {sales.map((data) => {
                return (
                  <>
                    <tr>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                        {data.client}
                      </td>

                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                        {data.description}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                        {moment(data.date).format('DD-MMM-YYYY')}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                        ${data.total_sale}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                        {data.phone}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                        <TableDropdown />
                      </td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    
    </>
    
  )
}
