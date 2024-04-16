import React from 'react';
import jsYaml from 'js-yaml';
import * as XLSX from 'xlsx';
import Header from './Header';
import './Styles.css';

class YamlConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yamlData: '',
      excelData: null
    };
  }

  componentDidMount() {
    // Dynamically add Bootstrap CSS link to the document head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css';
    link.integrity = 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const yamlData = e.target.result;
      this.setState({ yamlData });
    };

    reader.readAsText(file);
  };

  // Convert YAML to Excel
  convertToExcel = () => {
    const { yamlData } = this.state;
    if (!yamlData) {
      alert('Please select a YAML file first.');
      return;
    }

    try {
      const jsonData = jsYaml.load(yamlData);

      const flattenedData = flattenObject(jsonData);

      // Construct an array of rows
      const dataRows = [flattenedData];

      const sheet = XLSX.utils.json_to_sheet(dataRows); // No need to skip the header row
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

      const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const excelUrl = URL.createObjectURL(excelBlob);

      this.setState({ excelData: excelUrl });
    } catch (error) {
      alert('Error occurred while converting YAML to Excel: ' + error.message);
    }
  };

  render() {
    const { excelData } = this.state;

    return (
      <div>
        <Header /> {/* Include the Header component */}
        <div className="container">
        <div className="mb-3">
          <input className="form-control-file mb-3" type="file" onChange={this.handleFileChange} />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={this.convertToExcel}>Convert to Excel</button>
        </div>
        {excelData && (
          <div className="mb-3">
            <h3>Download Excel</h3>
            <a href={excelData} download="data.xlsx" className="btn btn-success">Download Excel</a>
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default YamlConverter;

// Function to flatten nested YAML object
function flattenObject(obj, prefix = '') {
  let flattenedData = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      flattenedData = { ...flattenedData, ...flattenObject(obj[key], prefix + key + '_') };
    } else if (Array.isArray(obj[key])) {
      // Flatten arrays
      obj[key].forEach((item, index) => {
        for (let itemKey in item) {
          flattenedData[prefix + key + '_' + index + '_' + itemKey] = item[itemKey];
        }
      });
    } else {
      // Convert date string to Date object
      if (key === 'date' && obj[key]) {
        flattenedData[prefix + key] = new Date(obj[key]);
      } else {
        flattenedData[prefix + key] = obj[key];
      }
    }
  }
  return flattenedData;
}
