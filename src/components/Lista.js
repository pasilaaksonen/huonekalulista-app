import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment';

let day = ""

const Lista = React.forwardRef(( props, ref ) => {

    const [ prepareTable, setPrepareTable ] = useState([])
    //Apulista tulostettavan listan luomiseen
    const components = [
        ["ruuvit", "Ruuvi", "A-2", "kpl"],
        ["vetimet", "Vedin", "A-3", "kpl"],
        ["kangaspalat", "Kangaspala", "A-4", "kpl"],
        ["isotMantylevyt", "Iso mäntylevy","B-1", "kpl"],
        ["pienetMantylevyt", "Ruuvi","B-2", "kpl"],
        ["hyllylevyt", "Hyllylevy","C-10", "kpl"],
        ["vanerilevyt", "Vanerilevy","D-1", "kpl"],
        ["koivulankut", "Koivulankku","D-4", "m"],
        ["lasiovet", "Lasiovi","E-1", "kpl"],
    ]

    //Komponentin käynnistyessä käsitellään data taulukkoon aseteltavaksi
    useEffect(() => {
        let tempArray = []
        day = moment(props.pdfLists.pvm).format("DD.MM.YYYY");
        const pdfObjectAsArray = Object.entries(props.pdfLists);
        components.forEach(component => {
            let itemCount = 0
            if (props.pdfLists.hasOwnProperty(component[0])) {
                pdfObjectAsArray.forEach(arrayItem => {
                    if(arrayItem[0] === component[0]) {
                        itemCount = arrayItem[1]
                    }  
                })
                if (itemCount > 0) {
                    tempArray.push([component[1], `${itemCount} ${component[3]}`, component[2]])
                }
            }         
        })
        setPrepareTable(tempArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div ref={ref} className="final-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th colSpan={4}>{day}</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                    <th>Komponentti</th>
                    <th>Määrä</th>
                    <th>Hylly</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        prepareTable.map((item, key) => (
                            <tr key={key}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
})

export default Lista
