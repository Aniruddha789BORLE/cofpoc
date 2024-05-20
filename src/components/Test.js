import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Styles.css';
import { resetSchema } from 'appium/build/lib/schema/schema';

const ExcelConcatenator = () => {
  // State to store data from the first Excel sheet
  const [firstExcelData, setFirstExcelData] = useState([]);
  
  // State to store data from the second Excel sheet
  const [secondExcelData, setSecondExcelData] = useState([]);

  // const [finalData, setFinalState] = useState([resetSchema]);
  
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // State to manage errors during concatenation
  const [concatenationError, setConcatenationError] = useState(null);

  // State to track upload status of each sheet
  const [firstSheetUploaded, setFirstSheetUploaded] = useState(false);
  const [secondSheetUploaded, setSecondSheetUploaded] = useState(false);

  // Function to handle file upload and read data from the Excel file
  const handleFileUpload = (e, setExcelData, setSheetUploaded) => {
    setIsLoading(true); // Set loading state to true
    setConcatenationError(null); // Clear any previous errors

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert sheet to JSON array
      setExcelData(jsonData); // Set the Excel data in the state
      setSheetUploaded(true); // Mark the sheet as uploaded
      setIsLoading(false); // Set loading state to false
    };
    reader.onerror = (error) => {
      setConcatenationError(error); // Set error state if reading fails
      setIsLoading(false); // Set loading state to false
    };
    reader.readAsBinaryString(file); // Read file as binary string
  };

  // Function to concatenate the two Excel sheets
  const handleConcatenate = () => {
    setIsLoading(true); // Set loading state to true
    setConcatenationError(null); // Clear any previous errors

    // Check if both sheets have been uploaded
    if (!firstSheetUploaded || !secondSheetUploaded) {
      setConcatenationError(new Error('Please upload both Excel sheets.')); // Set error if one or both sheets are missing
      setIsLoading(false); // Set loading state to false
      return;
    }

    // Concatenate the two Excel sheets
    const concatenatedData = [];
    const maxRows = Math.max(firstExcelData.length, secondExcelData.length);
    for (let i = 0; i < maxRows; i++) {
      const row = [];
      const maxCols = Math.max(firstExcelData[i]?.length || 0, secondExcelData[i]?.length || 0);
    
      for (let j = 0; j < maxCols; j++) {
        const cellValue = (firstExcelData[i]?.[j] || '') + (secondExcelData[i]?.[j] || ''); // Concatenate corresponding cell values, handling missing cells
        row.push(cellValue);
      }
    }
    
      concatenatedData.push(row);

    // Create a new workbook and sheet with the concatenated data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(concatenatedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Concatenated');

    // Convert the workbook to a buffer and create a Blob
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a URL for the Blob and trigger download
    const excelUrl = URL.createObjectURL(excelBlob);
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'Concatenated.xlsx';
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);

    setIsLoading(false); // Set loading state to false
  };

  return (
    <div className="container">
      <div className="a">
        <p>Import File:</p>
        <label htmlFor="firstFileInput" className="fileLabel">Import First Excel file    :   </label>
        <input type="file" id="firstFileInput" onChange={(e) => handleFileUpload(e, setFirstExcelData, setFirstSheetUploaded)} accept=".xlsx, .xls" />
      </div>
      <div className="a">
        <label htmlFor="secondFileInput" className="fileLabel">Import Second Excel file :    </label>
        <input type="file" id="secondFileInput" onChange={(e) => handleFileUpload(e, setSecondExcelData, setSecondSheetUploaded)} accept=".xlsx, .xls" />
      </div>
      <div className="a">
        <button onClick={handleConcatenate} disabled={isLoading || !firstSheetUploaded || !secondSheetUploaded}>
          {isLoading ? 'Wait....' : 'Generate Test-Cases'}
        </button>
        {concatenationError && <p>Error: {concatenationError.message}</p>} {/* Display error message if there's an error */}
      </div>
    </div>
  );
};

export default ExcelConcatenator;
