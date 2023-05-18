import React from "react";
import { logoIcon } from "../../../../../assets/icons";
import {
  PDFViewer,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1pt solid #333",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "red",
  },
  table: {
    // display: "table",
    width: "auto",
    marginBottom: 30,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    height: 40,
    fontStyle: "bold",
  },
  tableColHeader: {
    width: "15%",
    textAlign: "center",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  tableCol: {
    width: "15%",
    // textAlign: "left",
    paddingLeft: 10,
    textAlign: "center",
  },
  tableDescription: {
    // width: "40%",
  },

  tableSeriol: {
    width: "5%",
  },
  tableValue: {
    // width: "30%",
    textAlign: "right",
    paddingRight: 10,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    borderTop: "1pt solid #333",
    paddingTop: 10,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  signatureColumn: {
    width: "30%",
    textAlign: "center",
  },
  signatureLabel: {
    fontSize: 10,
    marginBottom: 10,
  },
  signatureLine: {
    height: 1,
    width: "80%",
    borderBottom: "1pt solid #333",
  },
});

interface exportPdfExpense {
  expenses: any;
  monthName: any;
}

//

const ExpensePDF: React.FC<exportPdfExpense> = ({ expenses, monthName }) => {
  const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logoIcon} style={{ width: 100, height: 50 }} />
          <Text style={styles.heading}>Easyology {monthName} Expenses</Text>
          <Text>{new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Serial No.</Text>
            <Text style={styles.tableColHeader}>Date</Text>
            <Text style={styles.tableColHeader}>Amount</Text>
            <Text style={[styles.tableColHeader, styles.tableDescription]}>
              Description
            </Text>
            <Text style={styles.tableColHeader}>Pay Method</Text>
          </View>

          {expenses?.map((expense: any, index: any) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>{index + 1}</Text>
              </View>
              {/* <View style={styles.tableCol}>{monthName}</View> */}
              <View style={styles.tableCol}>
                <Text>{dayjs(expense?.expenseDate).format("MM/DD/YYYY")}</Text>
              </View>
              <View style={styles.tableCol}>
                {<Text>$ {expense?.expenseAmount}</Text>}
              </View>
              <View style={styles.tableCol}>
                <Text>{expense?.expenseDescription}</Text>
              </View>
              {/*  <View style={styles.tableCol}>
                  <Text>{expense.category}</Text>
                </View> */}
              <View style={styles.tableCol}>
                {<Text> {expense?.paymentType}</Text>}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text>Company Name: {data?.storeName ?? ''}</Text>
          <Text>Company Address: {data?.storeAddress ?? ''}</Text>
          <Text>Contact Number: {data?.contact ?? ''}</Text>
        </View>
        <View style={styles.signatureRow}>
          <View style={styles.signatureColumn}>
            <Text style={styles.signatureLabel}>Prepared by</Text>
            <View style={styles.signatureLine} />
          </View>
          <View style={styles.signatureColumn}>
            <Text style={styles.signatureLabel}>Approved by</Text>
            <View style={styles.signatureLine} />
          </View>
          <View style={styles.signatureColumn}>
            <Text style={styles.signatureLabel}>Received by</Text>
            <View style={styles.signatureLine} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ExpensePDF;
