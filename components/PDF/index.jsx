import React, { useState } from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Font,
  Image,
  StyleSheet,
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

const BORDER_COLOR = "#bfbfbf";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

function ReactPDF({ prods, totalSales }) {
  const [sales, setSales] = useState([]);

  const awsURL = "https://i.imgur.com/XZM9ePZ.png";
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
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
            REPORTE MENSUAL {currentMonth} - PREVISION VENTAS
          </Text>
          <Text
            style={{
              marginTop: 200,
              marginLeft: 40,
              fontSize: 14,
              fontFamily: "Times-Roman",
              position: "absolute",
            }}
          >
            FECHA ACTUAL: {weekdayNumber} {currentMonth}, {year}
          </Text>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1Header}>
              <Text style={styles.tableCellHeader}>Product</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Type</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Period</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Price</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>React-PDF</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>3</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>5€</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Another row</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                Capítulo I: Que trata de la condición y ejercicio del famoso
                hidalgo D. Quijote de la Mancha
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2019-05-20 - 2020-07-19</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>25€</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // <Document>
    //   <Page>
    //     <Image source={awsURL} style={{ position: "relative" }} />
    //     <View
    //       style={{ margin: 10, padding: 10, flexGrow: 1, position: "absolute" }}
    //     >
    //       <Text
    //         style={{
    //           fontSize: 11,
    //           marginLeft: 480,
    //           marginTop: 120,
    //           textAlign: "center",
    //           fontFamily: "Oswald",
    //           position: "absolute",
    //           fontWeight: 400,
    //         }}
    //       >
    //         1
    //       </Text>
    //       <Text
    //         style={{
    //           fontSize: 24,
    //           marginLeft: 220,
    //           marginTop: 150,
    //           textAlign: "center",
    //           fontFamily: "Oswald",
    //           position: "absolute",
    //         }}
    //       >
    //         REPORTE MENSUAL {currentMonth} - PREVISION VENTAS
    //       </Text>
    //       <View>
    //         <Text
    //           style={{
    //             marginTop: 200,
    //             marginLeft: 40,
    //             fontSize: 14,
    //             fontFamily: "Times-Roman",
    //             position: "absolute",
    //           }}
    //         >
    //           FECHA ACTUAL: {weekdayNumber} {currentMonth}, {year}
    //         </Text>
    //         <Text
    //           style={{
    //             fontSize: 16,
    //             marginLeft: 40,
    //             marginTop: 250,
    //             fontFamily: "Oswald",
    //             position: "absolute",
    //           }}
    //         >
    //           VENTAS
    //         </Text>
    //         <Text
    //           style={{
    //             marginTop: 280,
    //             marginLeft: 40,
    //             fontSize: 14,
    //             fontFamily: "Times-Roman",
    //             position: "absolute",
    //           }}
    //         >
    //           Se cerraron ventas por valor de : {totalSales}
    //         </Text>
    //         <Text
    //           style={{
    //             fontSize: 16,
    //             marginLeft: 40,
    //             marginTop: 310,
    //             fontFamily: "Oswald",
    //             position: "absolute",
    //           }}
    //         >
    //           PRODUCTOS
    //         </Text>
    //         <Text
    //           style={{
    //             marginTop: 335,
    //             marginLeft: 40,
    //             fontSize: 14,
    //             fontFamily: "Times-Roman",
    //             position: "absolute",
    //           }}
    //         >
    //           Productos más vendidos : {prods}
    //         </Text>
    //       </View>
    //       <Text
    //         style={{
    //           marginTop: 380,
    //           marginLeft: 50,
    //           fontSize: 14,
    //           textAlign: "justify",
    //           fontFamily: "Times-Roman",
    //           position: "absolute",
    //         }}
    //       >
    //         Este reporte se genera el {weekdayNumber} de {currentMonth} de{" "}
    //         {year} siendo las {time} horas
    //       </Text>
    //       <Text
    //         style={{
    //           position: "absolute",
    //           fontSize: 12,
    //           bottom: 30,
    //           left: 0,
    //           right: 0,
    //           textAlign: "center",
    //           color: "grey",
    //         }}
    //         render={({ pageNumber, totalPages }) =>
    //           `${pageNumber} / ${totalPages}`
    //         }
    //         fixed
    //       />
    //     </View>
    //   </Page>
    // </Document>
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
