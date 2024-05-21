// import React from 'react';
// import jsYaml from 'js-yaml';
// import * as XLSX from 'xlsx';
// import  Header from '../Header';
// import SideNav from '../SideNav';
// import Footer from '../Footer';
// import './Styles.css';

// class TestCaseGeneration2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       yamlData: '',
//       excelData: null,
//       testCaseData: null
//     };
//   }

//   componentDidMount() {
//     // Dynamically add Bootstrap CSS link to the document head
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css';
//     link.integrity = 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh';
//     link.crossOrigin = 'anonymous';
//     document.head.appendChild(link);
//   }
  
  
//   handleFileChange = event => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = e => {
//       const exceldata1 = e.target.result;
//       this.setState({ exceldata1 });
//     };

//     reader.readAsText(file);
//   };
//       // Function to generate test cases from Excel data
//       generateTestCases = () => {
//        const  { excelData } = this.state;
//         if (!excelData) {
//           alert('Please upload an Excel file first.');
//           return;
//         }
    
//         try {
//           const workbook = XLSX.read(excelData, { type: 'array' });
//           const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
//           const worksheet = workbook.Sheets[sheetName];
//           const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
//           // Generate test cases based on Excel data (example logic)
//           const testCases = jsonData.map((row, index) => ({
//             id: index + 1,
//             testCaseName: row['TestCaseName'],
//             input: row['Input'],
//             expectedOutput: row['ExpectedOutput']
//           }));
//            // Convert test cases back to Excel format
//       const testCasesSheet = XLSX.utils.json_to_sheet(testCases);
//       const testCasesWorkbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(testCasesWorkbook, testCasesSheet, 'TestCases');

//       const testCasesBuffer = XLSX.write(testCasesWorkbook, { type: 'array', bookType: 'xlsx' });
//       const testCasesBlob = new Blob([testCasesBuffer], { type: 'application/octet-stream' });
//       const testCasesUrl = URL.createObjectURL(testCasesBlob);

//       this.setState({ testCaseData: testCasesUrl });
//     } catch (error) {
//       alert('Error occurred while generating test cases: ' + error.message);
//     }
//   };


 
//   render() {
//     const { testCaseData } = this.state;

//     return (
//       <div>
//         {/* UI elements */}
//         <input type="file" onChange={this.handleExcelFileChange} />
//         <button onClick={this.generateTestCases}>Generate Test Cases</button>
//         {testCaseData && (
//           <a href={testCaseData} download="test_cases.xlsx">Download Test Cases</a>
//         )}
//       </div>
//     );
//   }
// }

// export default TestCaseGeneration2;

// 
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Styles.css'; // Import CSS file for styling

const DownloadTemplateButton = () => {
  const handleDownloadTemplate = () => {
    // Create dummy data for the Excel template
    // const dummyData = [
    //   { Name: 'John', Age: 30, City: 'New York' },
    //   { Name: 'Alice', Age: 25, City: 'Los Angeles' },
    //   { Name: 'Bob', Age: 35, City: 'Chicago' },
    // ];
    const dummyData = [
        ['TC_ID', 'Test Case Description', 'Test Steps', 'Expected Result', 'Expected Status Code'],
        ['1', 'Sample test case', 'Step 1', 'Expected result 1', '200'],
        // Add more rows as needed
      ];

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dummyData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    // Convert the buffer to a Blob
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a URL for the Blob
    const excelUrl = URL.createObjectURL(excelBlob);

    // Trigger a download of the Excel file
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'template.xlsx'; // Set the filename for the template
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);
  };

  return (
    <div>
      <p>Download the template file:</p>
      <button className="blue-button" onClick={handleDownloadTemplate}>Download Template</button>
    </div>
  );
};

const ExcelConcatenator = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const promises = [];

    // Read each uploaded Excel file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsBinaryString(file);
      });
      promises.push(promise);
    }

    // Once all files are read, concatenate the data
    Promise.all(promises)
      .then((results) => {
        const concatenatedData = results.flat(); // Flatten the array of arrays
        setExcelData(concatenatedData);
      })
      .catch((error) => {
        console.error('Error reading Excel files:', error);
      });
  };

  const handleConcatenate = () => {
    // Add "Hi" to each cell of existing excelData
    const dataWithHi = excelData.map(row => {
      const newRow = {};
      Object.keys(row).forEach(key => {
        newRow[key] = 'Hi ' + row[key]; // Concatenate "Hi" with each existing value
      });
      return newRow;
    });
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataWithHi);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TestCases');
  
    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  
    // Convert the buffer to a Blob
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    // Create a URL for the Blob
    const excelUrl = URL.createObjectURL(excelBlob);
  
    // Trigger a download of the Excel file
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'TestCases.xlsx';
    document.body.appendChild(link);
    link.click();
  
    // Clean up
    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);
  };
  
  return ( 
   <div className="container">
      <div>
        <DownloadTemplateButton />
      </div>
      <div>
        <p>Upload Excel file(s) to concatenate:</p>
        <input type="file" onChange={handleFileUpload} multiple accept=".xlsx, .xls" />
      </div>
      <div>
        <p>Generate Test Cases and Download:</p>
        <button className="blue-button" onClick={handleConcatenate}>Generate Test Cases and Download</button>
      </div>
    </div>
  );
};

export default ExcelConcatenator
