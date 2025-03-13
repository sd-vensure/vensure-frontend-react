import React from "react";

const Dummy = () => {
  const handlePrint = () => {
    const printSection = document.getElementById("print-section");
    const printWindow = window.open("", "_blank");
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Section</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .printable {
              width: 100%;
              margin: 0 auto;
            }
          </style>
        </head>
        <body>
          <div class="printable">
            ${printSection.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <h1>My Webpage</h1>
      <p>This is some content that will not be printed.</p>

      <div id="print-section">
        <h2>This is the section to print</h2>
        <p>This content will be printed when you click the print button.</p>
      </div>

      <button onClick={handlePrint}>Print Section</button>
    </div>
  );
};

export default Dummy;
