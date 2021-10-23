import React, { useEffect, useState } from "react";
import moment from 'moment'
const products = () => {
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
    <div>
      <div className="flex flex-wrap items-center pt-32">
        <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
          <div className="justify-center flex flex-wrap relative">
            <div className="my-4 w-full lg:w-6/12 px-4">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                target="_blank"

                // {
                //   this.POSFields.map((posFields, POSFieldsId) => {
                //     return (
                //       <tr>
                //         <td className="posheader" key={POSFieldsId} value={posFields.POSFieldsId}
                //           {posFields.POSFields} </td>
                //     <td>
                //           <select className="selectpicker">
                //             <option value="">Select Value</option>
                //             {this.headers.map((headers) => {
                //               return (
                //                 <option key={headers}>{headers}</option>
                //               );
                //             })}
                //           </select>
                //         </td>
                //       </tr>
                //     )
                //   })
                // }
              >
                {category.map((cate) => {
                  return (
                    <>
                      <>
                        <p>{cate.name}</p>
                      </>
                      {prods.map((prod) => (
                        <>
                          {cate.id === prod.id_category &&
                          category.length > 0 ? (
                            <div className="bg-gray-400">
                              <div className="shadow-lg p-8 ">  
                                <div className="image">
                                <img 
                                  alt="product image"
                                  className="shadow-md rounded-1"
                                  src={prod.image}
                                  width="100"
                                  height="100" 
                                  
                                />
                                </div>
                                <div className="content">

                                <p className="text-lg text-black mt-4 font-semibold">
                                  {prod.name}
                                </p>
                                <p className="text-lg text-black mt-4 font-semibold">
                                  {moment(prod.expiration_date).format("DD-MMMM-YYYY")}
                                </p>
                                <p className="text-lg text-black mt-4 font-semibold">
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
                  //   {prods.map(prod => (
                  //     {cate.id === prod.id_category
                  //       ? <p>lorem</p>
                  //       : <hr />
                  //     }
                  // ))}
                })}
                {/* {prods.length > 0 &&
                  prods.map((prod, idx) => (
                    // console.log('prod', prod)

                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="product image"
                        className="shadow-md rounded-full max-w-full  mx-auto p-2 bg-white"
                        src={prod.image}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        {prod.name}
                      </p>
                      <p className="text-lg text-white mt-4 font-semibold">
                        {prod.unit_cost}
                      </p>
                      <p className="text-lg text-white mt-4 font-semibold">
                        {prod.unit_price}
                      </p>
                    </div>
                  ))} */}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
          <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
            <i className="fas fa-drafting-compass text-xl"></i>
          </div>
          <h3 className="text-3xl mb-2 font-semibold leading-normal">
            Productos recientes
          </h3>
          <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
            En este panel podrás ver todos los productos existentes en tu tienda
          </p>
          <div className="block pb-6">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Despensa
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Licor
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Mercado
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Abarrotes
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Galgerías
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Dulces
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
              Cigarrillos
            </span>
          </div>
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=nnjs-index"
            target="_blank"
            className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
          >
            Ver todos{" "}
            <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default products;
