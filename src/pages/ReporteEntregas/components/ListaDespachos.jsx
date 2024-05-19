import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { Typography } from "@mui/material";
import { TableManager } from "../../../components";
import { headCells } from "../data/dataCells";
import { CabeceraBuscar } from "./CabeceraBuscar";
import { useListaEntregas } from "../hooks/useListaEntregas";

const tableTitle = "Reporte de Entregas";

export const ListaDespachos = ()=>{
    const { cargandoRegistros, registros, onListarDespachos } = useListaEntregas();
    const workbook = new Excel.Workbook();

    const saveExcel = async ({workSheetName, fileName, columns, data}) => {
      try {
        // creating one worksheet in workbook
        const worksheet = workbook.addWorksheet(workSheetName);
        // add worksheet columns
        // each columns contains header and its mapping key from data
        worksheet.columns = columns;
        // updated the font for first row.
        worksheet.getRow(1).font = { bold: true, color: {argb: "ffffff"}};

        worksheet.getRow(1).eachCell({ includeEmpty: false }, function(cell) {
            worksheet.getCell(cell.address).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "04195f" },
            }
        });
        // loop through all of the columns and set the alignment with width.
        worksheet.columns.forEach(column => {
          column.width = column.header.length + 8;
          column.alignment = { horizontal: 'center' };
        });
  
        // loop through data and add each one to worksheet
        data.forEach(singleData => {
          worksheet.addRow(singleData);
        });
  
        // loop through all of the rows and set the outline style.
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          // store each cell to currentCell
          const currentCell = row._cells;
          let statusColor = null, statusOnTimeBackgroundColor = null, statusOnTimeColor = null;
          if (rowNumber > 1){
            const item = data[rowNumber - 2];
            statusColor = item?.statusColor?.slice(1);
            statusOnTimeBackgroundColor = item?.statusOnTimeBackgroundColor?.slice(1);
            statusOnTimeColor = item?.statusOnTimeColor?.slice(1);
          }
  
          // loop through currentCell to apply border only for the non-empty cell of excel
          currentCell.forEach(singleCell => {
            // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
            const cellAddress = singleCell._address;

            if (rowNumber > 1 ){
                if (singleCell._column._key === "statusOnTime"){
                    worksheet.getCell(cellAddress).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: statusOnTimeBackgroundColor}
                    };

                    worksheet.getCell(cellAddress).font = { 
                        bold: true, 
                        color: {argb: statusOnTimeColor}
                    };
                }

                if (singleCell._column._key === "status"){
                    worksheet.getCell(cellAddress).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: statusColor}
                    };

                    worksheet.getCell(cellAddress).font = { 
                        bold: true, 
                        color: {argb: "ffffff"}
                    };
                }
            }
            
            // apply border
            worksheet.getCell(cellAddress).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
        });
  
        // write the content using writeBuffer
        const buf = await workbook.xlsx.writeBuffer();
  
        // download the processed file
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
      } catch (error) {
        console.error('<<<ERRROR>>>', error);
        console.error('Algo ha fallado.', error.message);
      } finally {
        // removing worksheet's instance to create new one
        workbook.removeWorksheet(workSheetName);
      }
    };
    
    const handleExcel = () => {
        saveExcel({
            fileName : 'ReporteEntregas',
            workSheetName: 'REGISTROS',
            columns : headCells.map ( headCell => {
                const key = headCell.id;
                const head = {header: headCell.label, key };
                if (["fechaRegistro", "fechaRecojo", "fechaProgramadaEntrega", "fechaEntrega"].includes(key)){
                    return { ... head, style: { numFmt: 'dd/mm/yyyy' }};
                }
                return head;
            }),
            data: registros
        });
    };
 
    return <TableManager
                tableTitle={tableTitle}
                rows =  {registros} 
                loadingData = { cargandoRegistros }
                headCells = { headCells }
                isSearchAllowed = {true}
                isSelectableRows = { false }
                registersPerPage= {30}
                strechTable = { true }
                >
                <Typography ml={2} mb={1} variant="body2" >Mostrando <b>{registros?.length}</b> registros:</Typography>
                <CabeceraBuscar onListar = {onListarDespachos} handleExcel={handleExcel} bloqueadoExcel = { registros?.length <= 0 } cargandoRegistros = { cargandoRegistros }/>
            </TableManager>
}