import React from "react";
import axios from "axios";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import DownloadPDF from "../../components/PDF/index";
import Button from "@material-tailwind/react/Button";

// layout for page
import Admin from "../../layouts/Admin";

const postToPdf = async e => {
  try {
    await axios
      .post("http://localhost:4000/report", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(data => {
        console.log("Success!");
      })
      .catch(e => console.error(e));
  } catch (error) {
    console.error(e);
  }
};

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
          {/* <DownloadPDF
            awsURL="chrome://favicon/size/64@1x/https://docs.google.com/document/u/1/"
            projectName="DOCUMENT PDF"
            projectLocation="BOGOTA"
            prods="Galletas, gaseosa, cerveza, cigarrillos"
            totalSales="$ 4.500.000"
          /> */}

          <Button
            color="blue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={postToPdf}
          >
            DESCARGAR REPORTE
          </Button>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
