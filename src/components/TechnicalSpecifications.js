import React from 'react';
import './Styles.css';

class TechnicalSpecifications extends React.Component {

  componentDidMount() {
    // Dynamically add Bootstrap CSS link to the document head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css';
    link.integrity = 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }


  render() {
     const {    } = this.state;

    return (
      <div>
        <div>
            <h1>Technical Specifications</h1>
            {/* Add content here */}
        </div>
  
  <div style={{ display: 'flex' }}>
      <div className="mainbody" style={{ flex: '1' }}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="container">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 class="text-secondary" style={{ margin: '1cm'}}>
        <span class="glyphicon glyphicon-asterisk"></span>
          <p style={{ 'font-size': '20px' }}>Select a YAML or RAML file extension to convert it to Excel format</p>
          </h2>
      </div>
    </div>

    <div className="container" style={{ maxWidth: '1000px'}}>
      <div className="mb-3" style={{ margin: '0 auto', width: 'fit-content',marginRight:'230px' }}>
        <label htmlFor="fileInput" className="custom-file-upload">
          {/* <i className="fas fa-upload"></i> Upload File */}
        
          <input type="file" onChange={this.handleFileChange} />
        </label>
      </div>
      <div className="mb-3" style={{ margin: '0 auto', width: 'fit-content' }}>
        <button className="btn btn-primary" onClick={this.convertToExcel}>Convert to Excel</button>
      </div>
      {excelData && (
        <div className="mb-3" style={{ margin: '0 auto', width: 'fit-content' }}>
          {/* <h3>Download Excel</h3> */}
          <a href={excelData} download="data.xlsx" className="btn btn-success">Download Excel</a>
        </div>
      )}
    </div>
  </div>
</div>


    </div>
  </div>
);

  
  }
}

export default TechnicalSpecifications;