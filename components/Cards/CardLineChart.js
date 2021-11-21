import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";

export default function CardLineChart() {
  const [sales, setSales] = useState([]);
  const [debts, setDebts] = useState([]);

  let dataSet = [];
  let dataSetDebt = [];
  let timing = [];

  const getSales = async () => {
    const resp = await fetch("http://localhost:4000/api/sales/acc-sales", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("glob_token")}`
      }
    });
    const data = await resp.json();
    console.log("Sales", data.sales);
    setSales(data.sales);
  };
  const getDebts = async () => {
    const resp = await fetch("http://localhost:4000/api/sales/acc-debts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("glob_token")}`
      }
    });
    const data = await resp.json();
    console.log("Sales", data.sales);
    setDebts(data.sales);
  };

  sales.map(index => dataSet.push(index.total));
  debts.map(index => dataSetDebt.push(index.total));
  sales.map(index => timing.push(moment(index.Fecha_cierre).format("MMMM")));
  React.useEffect(() => {
    getSales();
    getDebts();
    /* var config = {
      type: 'line',
      data: {
        labels: timing,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: dataSet,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white',
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white',
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    }
    var ctx = document.getElementById('line-chart').getContext('2d')
    window.myLine = new Chart(ctx, config) */
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-white-700">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Vista general
              </h6>
              <h2 className="text-white text-xl font-semibold">
                Valor de las ventas
              </h2>
            </div>
          </div>
        </div>
        <div className="p-6 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Line
              data={{
                labels: timing,
                datasets: [
                  {
                    label: "Ventas",
                    data: dataSet,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    tension: 0.4,
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 10
                  },
                  {
                    label: "Deudas",
                    data: dataSetDebt,
                    borderColor: "red",
                    backgroundColor: "red",
                    borderCapStyle: "butt",
                    tension: 0.4,
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 10
                  }
                ]
              }}
              options={{
                interaction: {
                  mode: "index",
                  intersect: false
                },
                maintainAspectRatio: false
              }}
              height={1000}
              width={1000}
            />
          </div>
        </div>
      </div>
    </>
  );
}
