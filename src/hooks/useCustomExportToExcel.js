import { Workbook } from "exceljs";

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

function determinarTipoDato(valor) {
  if (/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.test(valor)) {
    return 'Fecha';
  }
  return 'Cadena de Texto'; 
}

export const useCustomExportToExcel = () => {
  const exportToExcel = async ({ excelData, fileName, cabeceras, colorCabecera, dataDirection }) => {
    const wb = new Workbook();
    const sheet = wb.addWorksheet("Datos");
    const headerLabels = cabeceras.map((item) => item.label);
    const headerRow = sheet.addRow(headerLabels);

    headerRow.eachCell((cell) => {
      if (Boolean(colorCabecera)){
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: colorCabecera
          }
        };
      }
      
      cell.font = {
        bold: true
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' }; 
      cell.border = {
        top: { style: 'thin' }, 
        right: { style: 'thin' }, 
        bottom: { style: 'thin' }, 
        left: { style: 'thin' } 
      };
    });

    excelData.forEach((item) => {
      const rowData = cabeceras.map((cabecera) => item[cabecera.id]);
      const row = sheet.addRow(rowData);

      row.eachCell((cell) => {
        if (Boolean(dataDirection)){
          cell.alignment = { vertical: 'middle', horizontal: dataDirection }; 
        } else {
          cell.alignment = { vertical: 'middle'}; 
        }
        
        cell.border = {
          top: { style: 'thin' }, 
          right: { style: 'thin' }, 
          bottom: { style: 'thin' }, 
          left: { style: 'thin' } 
        };

        const tipoDato = determinarTipoDato(cell.value);
        if (tipoDato === 'Fecha') {
          cell.value = new Date(cell.value);
          cell.numFmt = 'dd/mm/yyyy';
        }
      });
    });

    sheet.columns.forEach((column, index) => {
      sheet.getColumn(index + 1).eachCell({ includeEmpty: true }, (cell) => {
        if (cell.value) {
          const cellLength = cell.value.toString().length;
          const headerLength = headerLabels[index].length;
          column.width = Math.max(column.width || 0, cellLength + 2, headerLength + 2);
        }
      });
    });

    wb.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: fileType
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = window.document.createElement("a");
      anchor.href = url;
      anchor.download = `${fileName}${fileExtension}`;
      anchor.click();

      window.URL.revokeObjectURL(url);
    });
  };

  return {
    exportToExcel
  };
};
