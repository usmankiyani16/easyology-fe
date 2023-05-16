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
    color:'red'
  },
  table: {
    // display: "table",
    width: "auto",
    marginBottom: 30,
    textAlign:'center'
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
    textAlign:'center'
  },
  tableDescription: {
    // width: "40%",
  },
  

  tableSeriol: {
    width: '5%'
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



const expenses = { 

    companyName:'Easyology Store',
    companyAddress: 'USA North South',
    contact : '0344567777',
    
    expenseData: [
  {
    month: "January",
    totalExpense: 5,
    totalExpenseAmount: 500,
    date: "2023-01-31",
    expenseDesc: "Office supplies",
    category: "Office",
    paymentMethod: "Credit Card",
  },
  {
    month: "March",
    totalExpense: "6",
    totalExpenseAmount: 300,
    date: "2023-03-28",
    expenseDesc: "Travel expenses",
    category: "Travel",
    paymentMethod: "Cash",
  },
  {
    month: "March",
    totalExpense: 9,
    totalExpenseAmount: 300,
    date: "2023-03-28",
    expenseDesc: "Office supplies",
    category: "Office",
    paymentMethod: "Credit Card",
  },
  {
    month: "April",
    totalExpense: 7,
    totalExpenseAmount: 1600,
    date: "2023-04-28",
    expenseDesc: "Travel expenses",
    category: "Travel",
    paymentMethod: "Cash",
  },
  {
    month: "April",
    totalExpense: 2,
    totalExpenseAmount: 16000,
    date: "2023-04-28",
    expenseDesc: "Dell Lenovo",
    category: "Laptop",
    paymentMethod: "Cash",
  },
  {
    month: "March",
    totalExpense: 2,
    totalExpenseAmount: 16000,
    date: "2023-02-28",
    expenseDesc: "Dell Lenovo",
    category: "Laptop",
    paymentMethod: "Cash",
  },
 
 
]
}

//

const ExpensePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={logoIcon} style={{ width: 100, height: 50 }} />
        <Text style={styles.heading}>Easyology Monthly Expenses</Text>
        <Text>{new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Serial No.</Text>
          <Text style={styles.tableColHeader}>Month</Text>
          <Text style={styles.tableColHeader}>Expense</Text>
          <Text style={styles.tableColHeader}>Amount</Text>
          <Text style={[styles.tableColHeader, styles.tableDescription]}>
            Description
          </Text>
          {/* <Text style={styles.tableColHeader}>Category</Text> */}
          <Text style={styles.tableColHeader}>Pay Method</Text>
        </View>
        {expenses?.expenseData?.map((expense, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>{index + 1}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{expense.month}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{expense.totalExpense}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>$ {expense.totalExpenseAmount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{expense.expenseDesc}</Text>
            </View>
           {/*  <View style={styles.tableCol}>
              <Text>{expense.category}</Text>
            </View> */}
            <View style={styles.tableCol}>
              <Text>{expense.paymentMethod}</Text>
            </View>
        
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text>Company Name: {expenses.companyName}</Text>
        <Text>Company Address: {expenses.companyAddress}</Text>
        <Text>Contact Number: {expenses.contact}</Text>
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

export default ExpensePDF;
