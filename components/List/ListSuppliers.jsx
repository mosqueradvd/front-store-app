import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
export default function ListSuppliers({ color }) {
  const router = useRouter();
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    getSupplier();
  }, []);
  const getSupplier = async () => {
    const resp = await fetch(
      "http://localhost:4000/api/supplier/get-supplier",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("glob_token")}`,
        },
      }
    );
    const data = await resp.json();
    console.log("suppliers", data.suppliers);
    setSupplier(data.suppliers);
  };
  const crearSuppliero = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push("/admin/create_supplier");
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
              onClick={crearSuppliero}
              ripple="light"
              rounded={false}
              block={false}
              iconOnly={false}
              style={{
                display: "flex",
              }}
            >
              Agregar Proveedor
              <Icon name="add" />
            </Button>
          </div>
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Nombre
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Telefono
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {supplier.map((index) => (
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4 text-left flex items-center">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {index.name} {index.lastname}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                    {index.phone}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
