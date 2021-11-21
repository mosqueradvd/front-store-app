import React, { useState, useEffect } from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);
  const [debts, setDebts] = useState([]);
  const [income, setIncome] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  const get_clients = async () => {
    const resp = await fetch("http://localhost:4000/client/get-client", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("glob_token")}`
      }
    });
    const data = await resp.json();
    setClients(data.client);
    console.log("clients", data.client);
  };
  const grandTotalSales = async () => {
    const resp = await fetch(
      "http://localhost:4000/api/sales/grand-total-sale",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("glob_token")}`
        }
      }
    );
    const data = await resp.json();
    console.log("Sales", data.grand_total);
    setSales(data.grand_total);
  };
  const grandTotalDebts = async () => {
    const resp = await fetch(
      "http://localhost:4000/api/sales/grand-total-debt",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("glob_token")}`
        }
      }
    );
    const data = await resp.json();
    console.log("Sales", data.grand_total);
    setDebts(data.grand_total);
  };
  const getIncome = async () => {
    const resp = await fetch("http://localhost:4000/api/balance/utilities", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("glob_token")}`
      }
    });
    const data = await resp.json();
    setIncome(data.marginGrossIncome);
  };

  useEffect(() => {
    get_clients();
    getSales();
    getIncome();
  }, []);

  useEffect(() => {
    get_clients();
    grandTotalSales();
    grandTotalDebts();
    getIncome();
  }, []);
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-4 lg:w-6/11 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CLIENTES"
                  statTitle={clients_text?.toString()}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Desde el último mes"
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="VENTAS"
                  statTitle={formatter.format(sales)}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Desde ayer"
                  statIconName="far fa-chart-line"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="DEUDAS"
                  statTitle={formatter.format(debts)}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Desde el último mes"
                  statIconName="fas fa-chart-bar"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="MARGEN DE UTILIDAD"
                  statTitle={income}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Desde el último mes"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
