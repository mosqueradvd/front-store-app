import React, { useEffect, useState } from "react";
import moment from "moment";
import { margin } from "tailwindcss/defaultTheme";
import TableDropdown from "components/Dropdowns/TableDropdown.js";

const ListProducts = ({ color }) => {
  const [prods, setProds] = useState([]);
  const [category, setCategory] = useState([]);
  let arr = [];

  const get_inventory = async () => {
    const resp = await fetch(
      "http://localhost:4000/api/inventory/get-inventory",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("glob_token")}`,
        },
      }
    );
    const inven = await resp.json();

    for (let index = 0; index < inven.products.length; index++) {
      for (let j = 0; j < inven.products[index].length; j++) {
        console.log(inven.products[index][j], "i-->", index, "j-->", j);
        const element = inven.products[index][j];

        arr.push(element);
      }
    }
    setProds(arr);
    setCategory(inven.category);
  };

  useEffect(() => {
    get_inventory();
  }, []);

  return (
    <>
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
                  Categoria
                </th>

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
                  Fecha de expiración
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Disponible
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
              {category?.map((cate) => {
                return (
                  <>
                    <tr>
                      <p className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                        {cate.name}
                      </p>
                    </tr>
                    {prods?.map((prod) => (
                      <>
                        {cate?.id === prod.id_category &&
                        category?.length > 0 ? (
                          <tr>
                            <th className="border-t-1 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              <img
                                src={prod.image}
                                className="bg-white rounded-md border"
                                alt="..."
                                width="150"
                                height="100"
                              />
                            </th>

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                              {prod.name}
                            </td>

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                              {moment(prod.expiration_date).format(
                                "DD-MMM-YYYY"
                              )}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                              {prod.stock}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                              <TableDropdown />
                            </td>
                          </tr>
                        ) : (
                          console.log("jeje")
                        )}
                      </>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

/**
 * return (
                <>
        <>
          <p className={(color === "light" ? "text-blueGray-700" : "text-white")}>
            {cate.name}
          </p>

          <br />
        </>
        {prods.map((prod) => (
          <>
            {cate.id === prod.id_category &&
              category.length > 0 ? (
                <div className="flex">
                  <div style={{ display: "flex", alignItems: "center", gap: "40px" }} className="shadow-lg p-5 flex-auto">
                    <div className="image">
                      <img
                        alt="product image"
                        className="shadow-md rounded-1"
                        src={prod.image}
                        width="150"
                        height="150"

                      />
                    </div>
                    <div className="content">

                      <p className={"text-lg text-black mt-4 font-semibold" +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }>
                        {prod.name}
                      </p>
                      <p className={"text-lg text-black mt-4 font-semibold" +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }>
                        {moment(prod.expiration_date).format("DD-MMMM-YYYY")}
                      </p>
                      <p className={"text-lg text-black mt-4 font-semibold" +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }>
                        Cantidad  <strong>{prod.stock}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                console.log("jeje")
              )}
          </>
        ))}
        <hr />
      </>
              );
 */
export default ListProducts;
