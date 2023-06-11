import { useEffect } from 'react';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

const table1Data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'Los Angeles' },
  ];
  
  const table2Data = [
    { country: 'USA', population: 328.2 },
    { country: 'Canada', population: 37.6 },
  ];

  
const MyPage = () => {
  const generateExcelSheet = () => {
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    const worksheet = XLSX.utils.aoa_to_sheet([]); // Create an empty worksheet

    const mainTitle = ['Main Title'];
    const subTitle = ['Sub Title'];
    const table1Heading = ['Table 1 Heading Title'];
    const table1ColumnTitles = ['Name', 'Age', 'City'];
    const table1DataRows = table1Data.map((row) => Object.values(row));
    const table2Heading = ['Table 2 Heading Title'];
    const table2ColumnTitles = ['Country', 'Population'];
    const table2DataRows = table2Data.map((row) => Object.values(row));

    XLSX.utils.sheet_add_aoa(worksheet, [mainTitle], { origin: -1 }); // Add main title to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [subTitle], { origin: -1 }); // Add subtitle to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 }); // Add empty row for spacing

    XLSX.utils.sheet_add_aoa(worksheet, [table1Heading], { origin: -1 }); // Add table 1 heading to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [table1ColumnTitles], { origin: -1 }); // Add table 1 column titles to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, table1DataRows, { origin: -1 }); // Add table 1 data rows to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 }); // Add empty row for spacing

    XLSX.utils.sheet_add_aoa(worksheet, [table2Heading], { origin: -1 }); // Add table 2 heading to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [table2ColumnTitles], { origin: -1 }); // Add table 2 column titles to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, table2DataRows, { origin: -1 }); // Add table 2 data rows to worksheet

    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' }); // Convert workbook to array buffer

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'data.xlsx');
  };

  useEffect(() => {
    generateExcelSheet();
  }, []);

  return <div>Generating Excel Sheet...</div>;
};

export default MyPage;
