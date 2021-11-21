import React, {useState, useEffect} from "react";
import { Bar } from 'react-chartjs-2'

// components

export default function CardSocialTraffic() {
  const [clientsSales, setClientsSales] = useState([])

  let dataSetSales = []
  let namesSales = []

  const getClients = async () => {
    const resp = await fetch('http://localhost:4000/client/most-debt-client', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    console.log('Sales', data.clients)
    setClientsSales(data.clients)
  }
  // const getDebts = async () => {
  //   const resp = await fetch('http://localhost:4000/api/sales/acc-debts', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
  //     },
  //   })
  //   const data = await resp.json()
  //   console.log('Sales', data.sales)
  //   setDebts(data.sales)
  // }

  clientsSales.map(index => dataSetSales.push(index.total))
  clientsSales.map(index => namesSales.push(index.name))

useEffect(() => {
  getClients()
}, [])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Clientes Morosos
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Ver todo
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto p-4 h-3">
          {/* Projects table */}
         <Bar
              data={{
                labels: namesSales,
                datasets: [
                  {
                    label: 'Deuda',
                    data: dataSetSales,
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      'orange',
                      'purple'
                    ]
                  },
                ],
              
              }}
              options={{}}
              
              width={400}
              height={600}
            />
        </div>
      </div>
    </>
  );
}
