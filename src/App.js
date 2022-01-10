import React, { useState, useRef } from "react";
import './App.css';
import Headeri from './components/Headeri';
import Kalenteri from './components/Kalenteri';
import Lista from './components/Lista'
import { useReactToPrint } from 'react-to-print';
import LuoLista from "./components/LuoLista";


function App() {

  const [ pdfLists, setPdfLists ] = useState(null);
  const [ printMode, setPrintMode ] = useState(false);
  const [ startDate, setStartDate ] = useState(new Date());
  const componentRef = useRef();

  const handlePrint = () => {
    setPrintMode(true);
    print();
  };

  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="App">
      <Headeri />
      <div className="page-content">
        {
          !pdfLists && <>
                        <Kalenteri setStartDate={setStartDate} startDate={startDate} />
                        <LuoLista setPdfLists={setPdfLists} handlePrint={handlePrint} startDate={startDate} />
                       </>
        }
        {
          pdfLists && <Lista ref={componentRef} pdfLists={pdfLists} printMode={printMode} />
        }
        {
          pdfLists && <>
                        <button className="cancel-button" onClick={() => setPdfLists(null)}>Peruuta</button>
                        <button onClick={handlePrint} className="print-button">Tulosta</button>
                      </>
        } 
      </div>
    </div>
  );
}

export default App;
