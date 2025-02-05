import { useState } from "react";
import ExcelJS from 'exceljs';

export const useExcelData = () => {
  const [tableData, setTableData] = useState(null);
  const [tableHeaders, setTableHeaders] = useState(null);

  const onHandleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const workbook = new ExcelJS.Workbook();
        const reader = new FileReader();

        reader.onload = async (event) => {
          const data = new Uint8Array(event.target.result);
          const loadedWorkbook = await workbook.xlsx.load(data);
          const worksheet = loadedWorkbook.worksheets[0];
          const dataFromExcel = [];
          let headersFromExcel = [];

          worksheet.eachRow((row, rowNumber) => {
            const rowData = { id: rowNumber - 1 };
            let i = 0;
            row.eachCell(cell => {
              const formattedCell = formatDateCell(cell.value);
              if (rowNumber === 1) {
                headersFromExcel.push(formattedCell);
              } else {
                rowData[i] = formattedCell;
              }
              i++;
            });
            if (rowNumber !== 1) {
              dataFromExcel.push(rowData);
            }
          });

          setTableHeaders(generateTableHeaders(headersFromExcel));
          setTableData(dataFromExcel);
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error al cargar y procesar el archivo:", error);
      }
    }
  };

  const formatDateCell = (cell) => {
    if (cell instanceof Date) {
      const formattedDate = cell.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
      return formattedDate;
    }

    if (cell?.formula){
      return cell.result;
    }

    return cell;
  };

  const generateTableHeaders = (headerRow) => {
    return headerRow
      .filter((header) => header.trim() !== '') 
      .map((header) => ({
        id: header,
        align: 'left',
        disablePadding: false,
        label: header,
      }));
  };

  const cleanData = ()=>{
    setTableData(null);
    setTableHeaders(null);
  }

  return {
    tableData,
    tableHeaders,
    onHandleFileChange,
    cleanData
  };
};
