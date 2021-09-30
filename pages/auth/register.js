import React, { useState } from "react";
import { useRouter, Router } from "next/router";
import axios from "axios";

import { set_glob_token } from "../../utils/set_token";

// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  const router = useRouter();

  // const [sign_up, set_sign_up] = useState({
  //   name: "",
  //   last_name: "",
  //   username: "",
  //   password: "",
  //   phone: "",
  //   address: "",
  //   store_name: "",
  // });

  const [sign_up, set_sign_up] = useState({
    name: "Alejandro",
    last_name: "Moreno",
    username: "mosqueradavid",
    password: "pass",
    phone: "3506545017",
    address: "calle 5 # 40-13",
    store_name: "Mosquer Inc 2",
  });

  const handleChange = (e) => {
    set_sign_up({
      ...sign_up,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (e) => {
    e.preventDefault();

    console.log('sign up', sign_up)

    await axios
      .post("http://localhost:4000/auth/register", sign_up, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      })
      .then((data) => {
        console.log("Data token", data);
        set_glob_token(data.data.token);
        router.push("/admin/dashboard");
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Regístrate con
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>O regístrate con credenciales</small>
                </div>
                <form onSubmit={signup}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre"
                      defaultValue={sign_up.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="last_name"
                    >
                      Apellido
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Apellido"
                      defaultValue={sign_up.last_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="username"
                    >
                      Apodo
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Apodo"
                      defaultValue={sign_up.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      defaultValue={sign_up.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Celular
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Celular"
                      defaultValue={sign_up.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="address"
                    >
                      Dirección
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Dirección"
                      defaultValue={sign_up.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="store_name"
                    >
                      Nombre de tu Tienda
                    </label>
                    <input
                      id="store_name"
                      name="store_name"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre de tu Tienda"
                      defaultValue={sign_up.store_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Estoy de acuerdo con{" "}
                        <a
                          href="/privacy-policy"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Política de Privacidad
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
