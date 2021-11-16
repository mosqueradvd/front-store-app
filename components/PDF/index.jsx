import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import Button from "@material-tailwind/react/Button";

const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
const weekdayNumber = new Date().getDay();
const month = new Date();
const currentMonth = month.toLocaleString("es-ES", { month: "long" });
const year = new Date().getFullYear();

function ReactPDF({ prods, totalSales }) {
  const awsURL = "https://i.imgur.com/XZM9ePZ.png";
  return (
    <Document>
      <Page>
        <Image source={awsURL} style={{ position: "relative" }} />
        <View
          style={{ margin: 10, padding: 10, flexGrow: 1, position: "absolute" }}
        >
          <Text
            style={{
              fontSize: 11,
              marginLeft: 480,
              marginTop: 120,
              textAlign: "center",
              fontFamily: "Oswald",
              position: "absolute",
              fontWeight: 400,
            }}
          >
            1
          </Text>
          <Text
            style={{
              fontSize: 24,
              marginLeft: 220,
              marginTop: 150,
              textAlign: "center",
              fontFamily: "Oswald",
              position: "absolute",
            }}
          >
            Reporte {currentMonth}
          </Text>
          <View>
            <Text
              style={{
                marginTop: 200,
                marginLeft: 40,
                fontSize: 14,
                fontFamily: "Times-Roman",
                position: "absolute",
              }}
            >
              Reporte con resumen de ventas del mes de {currentMonth}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 40,
                marginTop: 250,
                fontFamily: "Oswald",
                position: "absolute",
              }}
            >
              VENTAS
            </Text>
            <Text
              style={{
                marginTop: 280,
                marginLeft: 40,
                fontSize: 14,
                fontFamily: "Times-Roman",
                position: "absolute",
              }}
            >
              Se cerraron ventas por valor de : {totalSales}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 40,
                marginTop: 310,
                fontFamily: "Oswald",
                position: "absolute",
              }}
            >
              PRODUCTOS
            </Text>
            <Text
              style={{
                marginTop: 335,
                marginLeft: 40,
                fontSize: 14,
                fontFamily: "Times-Roman",
                position: "absolute",
              }}
            >
              Productos más vendidos : {prods}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 380,
              marginLeft: 50,
              fontSize: 14,
              textAlign: "justify",
              fontFamily: "Times-Roman",
              position: "absolute",
            }}
          >
            Este reporte se genera el {weekdayNumber} de {currentMonth} de{" "}
            {year} siendo las {time} horas
          </Text>
          <Text
            style={{
              position: "absolute",
              fontSize: 12,
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "grey",
            }}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </View>
      </Page>
    </Document>
  );
}

const LazyDownloadPDFButton = ({ id, prods, totalSales, awsURL }) => (
  <Button
    color="blue"
    buttonType="filled"
    size="regular"
    rounded={false}
    block={false}
    iconOnly={false}
    ripple="light"
    onClick={async () => {
      const doc = (
        <ReactPDF prods={prods} totalSales={totalSales} s3={awsURL} />
      );
      const asPdf = pdf([]); // [] is important, throws error without an argument
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, `Reporte ${currentMonth}.pdf`);
    }}
  >
    DESCARGAR REPORTE
  </Button>
);

LazyDownloadPDFButton.propTypes = {
  projectLocation: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectValueInLetters: PropTypes.string.isRequired,
  projectValueInNumbers: PropTypes.string.isRequired,
  awsURL: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

ReactPDF.propTypes = {
  projectLocation: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectValueInLetters: PropTypes.string.isRequired,
  projectValueInNumbers: PropTypes.string.isRequired,
  s3: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

export default LazyDownloadPDFButton;
