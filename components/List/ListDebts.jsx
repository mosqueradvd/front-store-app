import React, { useEffect, useState } from 'react'
import moment from 'moment'
import TableDropdown from 'components/Dropdowns/TableDropdown.js'

export default function ListDebts({ color }) {
  const [debts, setDebts] = useState([])

  let dataSet = []
  useEffect(() => {
    getDebts()
  }, [])
  const getDebts = async () => {
    const resp = await fetch('http://localhost:4000/api/sales/get-debts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    console.log('Sales', data.Debt)
    console.log('Clients', data.clients)
    for (let i = 0; i < data.Debt.length; i++) {
      if (data.Debt[i].id_client == data.clients[i].id) {
        dataSet.push({
          id: data.Debt[i].id,
          date: data.Debt[i].date_sale,
          total_debt: data.Debt[i].total_debt,
          client: data.clients[i].name + ' ' + data.clients[i].lastname,
          phone: data.clients[i].phone,
          description: data.Debt[i].description,
        })
      }
    }
    console.log(dataSet)

    setDebts(dataSet)
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
                  Fecha de Deuda
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Valor Deuda
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
              {debts.map((debt) => {
                return (
                  <>
                    <>
                      <tr>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                          {debt.client}
                        </td>

                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                          {debt.description}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                          {moment(debt.date).format('DD-MMM-YYYY')}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                          ${debt.total_debt}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                          {debt.phone}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                          <TableDropdown />
                        </td>
                      </tr>
                    </>
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
