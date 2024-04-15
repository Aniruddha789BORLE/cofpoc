import React from 'react';
import jsYaml from 'js-yaml';
import * as XLSX from 'xlsx';

class YamlConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yamlData: '',
      excelData: null
    };
  }

 z
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

      
      const flattenedData = [];
      const flattenObject = (obj, prefix = '') => {
        for (let key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            flattenObject(obj[key], prefix + key + '_');
          } else {
            flattenedData.push({ [prefix + key]: obj[key] });
          }
        }
      };
      flattenObject(jsonData);

      // Convert data to Excel
      const worksheet = XLSX.utils.json_to_sheet(flattenedData); 
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

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
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.convertToExcel}>Convert to Excel</button>
        {excelData && (
          <div>
            <h3>Download Excel</h3>
            <a href={excelData} download="data.xlsx">Download Excel</a>
          </div>
        )}
        <header>
                    <h1>This is the Header</h1>
                    <nav>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h2>Main Content</h2>
                    <p>This is the main content of the page.</p>
                </main>
      </div>
      
    );
  }
}

export default YamlConverter;
