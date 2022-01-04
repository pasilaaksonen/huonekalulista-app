import React, { useState, useRef } from "react";
import './App.css';
import Headeri from './components/Headeri';
import Kalenteri from './components/Kalenteri';
import Listat from './components/Listat'
import { useReactToPrint } from 'react-to-print';


function App() {

  const [pdfLists, setPdfLists] = useState(null)
  const componentRef = useRef();
  const handlePrint = () => {
    print()
  }
  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="App">
      <Headeri />
      <div className="page-content">
        <Kalenteri setPdfLists={setPdfLists} handlePrint={handlePrint} />
        {
          pdfLists && <Listat ref={componentRef} pdfLists={pdfLists} />
        }
        {
          pdfLists && <button onClick={handlePrint} className="print-button">Tulosta</button>
        } 
      </div>
    </div>
  );
}

export default App;
