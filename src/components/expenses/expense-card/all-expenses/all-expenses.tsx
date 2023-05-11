import React, { useRef } from "react";
import { Button, Input, Pagination } from "antd";
import exportIcon from "../../../../assets/icons/dashboard/export-Icon.png";
import AllExpenseCard from "./all-expenses-card/all-expenses-card";
import expense from "../../mock-data/expense";
import { SearchOutlined } from "@ant-design/icons";
import {
  PDFViewer,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "red",
    textAlign: "center",
  },
  table: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "20px",
    border: "2px solid red",
  },
  tableCell: {
    width: "50%",
    padding: "6px",
  },

  tablehead: {
    color: "green",
  },
  tableValues: {
    color: "grey",
  },
});

const AllExpenses = () => {
  const pdfRef = useRef(null);

  const generatePDF = () => {
    const { current } = pdfRef;

    if (current) {
      current.updateContainer();
      current.toPDF();
    }
  };

  const searchProduct = (value: any) => {
    console.log(value);
  };
  const ExpensePDF = () => (
    
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.heading}>Expenses Month Details</Text>
        </View>
        <View style={styles.table}>
          {Object.entries(expense).map(([key, value], index) => (
            <View key={key} style={styles.tableCell}>
              <Text style={styles.tablehead}>
                Seriol Number: <Text style={styles.tableValues}>{index}</Text>
              </Text>

              <Text style={styles.tablehead}>
                Month:<Text style={styles.tableValues}>{value?.month}</Text>
              </Text>

              <Text style={styles.tablehead}>
                Number of Expense:
                <Text style={styles.tableValues}>{value?.totalExpense}</Text>
              </Text>
              <Text style={styles.tablehead}>
                Total Expense Amount:
                <Text style={styles.tableValues}>
                  $ {value?.totalExpenseAmount}
                </Text>
              </Text>
              <Text style={styles.tablehead}>
                Date:<Text style={styles.tableValues}> {value?.date}</Text>
              </Text>
              <View>
                <Text style={styles.tablehead}>
                  Description:
                  <Text style={styles.tableValues}> {value?.expenseDesc}</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <div className="flex sm:flex-row xs:flex-col items-center justify-between mt-3">
        <div className="flex xs:flex-col xs:items-center sm:flex-row sm:items-center sm:gap-12 xs:justify-between">
          <h1 className="font-lato mt-4 xs:text-[1.8rem] sm:text-[2rem] whitespace-nowrap">
            Expenses of <span className="_primary-color">January</span>
          </h1>
          <div className="sm:mt-4">
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search Customer"
              onChange={(event) => searchProduct(event.target.value)}
            />
          </div>
        </div>

        <div>
          <Button
            className="_bg-white-color _primary-color _border-primary-color _white-color _hover font-medium mt-4 flex justify-between items-center gap-4"
            onClick={generatePDF}
          >
            <img
              className="flex justify-start"
              src={exportIcon}
              alt="exportIcon"
            />
            <PDFDownloadLink document={<ExpensePDF />} fileName="expenses.pdf">
              {({ loading }) => (loading ? "Loading..." : "Export Report")}
            </PDFDownloadLink>
          </Button>
        </div>
      </div>
      <div className="_cards">
        <AllExpenseCard expense={expense} />
      </div>

      {/*  <PDFViewer style={{ width: "100%", height: "600px" }} ref={pdfRef}>
        <ExpensePDF />
      </PDFViewer> */}
      <div>
        <Pagination
          //   onChange={handlePagination}
          className="flex justify-end"
          defaultCurrent={1}
          defaultPageSize={8}
          total={2}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AllExpenses;
