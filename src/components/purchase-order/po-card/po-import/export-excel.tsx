import React from 'react'
import {Button} from "antd";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style'

const ExportExcel = ({excelData, fileName}:any)=> {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension ='.xlsx';


    // ------------------- Data Export in Excel Compoent Logic -------------------------------

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData)
        const wb = {Sheets : {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx' , type:'array'});
        const data = new Blob([excelBuffer] , {type:fileType});
        FileSaver.saveAs(data , fileName + fileExtension);
    }
  return (
    <div>

        <Button className='ml-[68px] mt-10' onClick={(e) => exportToExcel(fileName)}>
            Download Excel
        </Button>
      
    </div>
  )
}

export default ExportExcel
