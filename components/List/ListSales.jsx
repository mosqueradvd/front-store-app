import React, { useEffect, useState } from "react";
import moment from "moment";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

export default function ListSales({ color }) {
  const [sales, setSales] = useState([]);
  const router = useRouter();
  let dataSet = [];
  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const resp = await fetch("http://localhost:4000/api/sales/get-sales", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("glob_token")}`,
      },
    });
    const data = await resp.json();
    console.log("Sales", data.sales);
    console.log("Clients", data.clients);

    for (let i = 0; i < data.sales.length; i++) {
      if (data.sales[i].id_client == data.clients[i].id) {
        dataSet.push({
          id: data.sales[i].id,
          date: data.sales[i].date_sale,
          total_sale: data.sales[i].total_sale,
          client: data.clients[i].name + " " + data.clients[i].lastname,
          phone: data.clients[i].phone,
          description: data.sales[i].description,
        });
      }
    }
    setSales(dataSet);
    console.log("SaleClient", dataSet);
  };

  const crearSellso = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push("/admin/create_sale");
    }, 1000);
  };

  const Abonos = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push("/admin/create_debt");
    }, 1000);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
        crossOrigin="anonymous"
      />

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1"></div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1em",
            }}
          >
            <Button
              color="green"
              type="submit"
              onClick={crearSellso}
              ripple="light"
              rounded={false}
              block={false}
              iconOnly={false}
              style={{
                display: "flex",
              }}
            >
              Agregar venta
              <Icon name="add" />
            </Button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, auto)",
              gridTemplateRows: "repeat(auto, auto)",
            }}
          >
            {sales.map((data) => (
              <div className="flex items-center justify-center p-2">
                <div className="bg-white rounded-3xl border shadow-xl p-8 w-l">
                  <div className="flex justify-between items-center mb-4">
                    <button className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full">
                      <svg
                        fill="#FFFFFF"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        viewBox="0 0 26 26"
                        width="26px"
                        height="26px"
                      >
                        <path d="M 9 5 L 9 7 L 7 7 L 7 20 L 9 20 L 9 22 L 11 22 L 11 20 L 13 20 L 13 22 L 15 22 L 15 19.90625 C 15.265625 19.871094 15.554688 19.855469 15.8125 19.8125 C 16.414063 19.613281 16.90625 19.394531 17.40625 19.09375 C 17.804688 18.792969 18.199219 18.40625 18.5 17.90625 C 18.800781 17.40625 18.90625 16.886719 18.90625 16.1875 C 18.90625 15.386719 18.585938 14.695313 18.1875 14.09375 C 17.6875 13.492188 17.085938 13.105469 16.1875 12.90625 C 16.886719 12.605469 17.386719 12.210938 17.6875 11.8125 C 17.988281 11.414063 18.1875 10.886719 18.1875 10.1875 C 18.1875 9.585938 18.105469 9.085938 17.90625 8.6875 C 17.707031 8.289063 17.398438 7.886719 17 7.6875 C 16.601563 7.488281 16.195313 7.289063 15.59375 7.1875 C 15.398438 7.15625 15.199219 7.125 15 7.09375 L 15 5 L 13 5 L 13 7 L 11 7 L 11 5 Z M 10 9 L 12.90625 9 C 13.207031 9 13.488281 8.992188 13.6875 9.09375 C 13.988281 9.09375 14.207031 9.210938 14.40625 9.3125 C 14.605469 9.414063 14.804688 9.488281 14.90625 9.6875 C 15.007813 9.886719 15.09375 10.105469 15.09375 10.40625 C 15.09375 11.007813 14.992188 11.394531 14.59375 11.59375 C 14.195313 11.894531 13.789063 12 13.1875 12 L 10 12 Z M 10 14 L 13.5 14 C 14.199219 14 14.8125 14.199219 15.3125 14.5 C 15.8125 14.800781 16 15.394531 16 16.09375 C 16 16.394531 15.914063 16.800781 15.8125 17 C 15.613281 17.300781 15.386719 17.492188 15.1875 17.59375 C 14.988281 17.695313 14.707031 17.804688 14.40625 17.90625 C 14.105469 18.007813 13.707031 18 13.40625 18 L 10 18 Z" />
                      </svg>
                    </button>
                    <div>
                      <span className="font-bold text-green-500">
                        {data.client}
                      </span>
                      <br />
                      <span className="font-medium text-xs text-gray-500 flex justify-end">
                        {moment(data.date).format("DD-MMM-YYYY")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-400">
                      {data.description}
                    </h3>
                    <h1 className="font-semibold text-xl text-gray-700">
                      ${data.total_sale}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
