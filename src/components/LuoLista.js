import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import ListaEsineet from "./ListaEsineet";
import Kalenteri from "./Kalenteri";
import listIcon from '../assets/listIcon.png'
import { BsArrowsMove } from 'react-icons/bs';

function LuoLista({ startDate, setPdfLists, setStartDate }) {

    //Tilat valitulle huonekalulle, lukumäärälle ja huonekalukorille
    const [ selectedItem, setSelectedItem ] = useState('Vitriini');
    const [ numberOfItems, setNumberOfItems ] = useState(1);
    const [ newFurnitureList, setNewFurnitureList ] = useState([]);

    //Komponentit
    const [ lasiovet, setLasiovet ] = useState(0);
    const [ vanerilevyt, setVanerilevyt ] = useState(0);
    const [ hyllylevyt, setHyllylevyt ] = useState(0);
    const [ ruuvit, setRuuvit ] = useState(0);
    const [ vetimet, setVetimet ] = useState(0);
    const [ kangaspalat, setKangaspalat ] = useState(0);
    const [ koivulankut, setKoivulankut ] = useState(0);
    const [ pienetMantylevyt, setPienetMantylevyt ] = useState(0);
    const [ isotMantylevyt, setIsotMantylevyt ] = useState(0);

    //Uuden huonekalun lisäys huonekalukoriin
    const handleAddNew = () => {
        if (numberOfItems <= 0) {
            setSelectedItem("Vitriini");
            setNumberOfItems(1);
            return
        }
        const newID = uuidv4();
        let itemComponents = null;
        if (selectedItem === "Vitriini") {
            itemComponents = ["x2 Lasiovi", "x1 vanerilevy", "x1 hyllylevy", "x16 ruuvi", "x2 vedin"];
            setLasiovet(lasiovet + 2 * numberOfItems);
            setVanerilevyt(vanerilevyt + 1 * numberOfItems);
            setHyllylevyt(hyllylevyt + 1 * numberOfItems);
            setRuuvit(ruuvit + 16 * numberOfItems);
            setVetimet(vetimet + 2 * numberOfItems);
        };
        if (selectedItem === "Tuoli") {
            itemComponents = ["x1 kangaspala", "x8 ruuvi", "3m koivulankku"];
            setKangaspalat(kangaspalat + 1 * numberOfItems);
            setRuuvit(ruuvit + 8 * numberOfItems);
            setKoivulankut(koivulankut + 3 * numberOfItems);
        };
        if (selectedItem === "Sivupöytä") {
            itemComponents = ["1,4m koivulankku", "x1 pieni mäntylevy", "x4 ruuvi", "x1 vedin"];
            setKoivulankut(koivulankut + 1.4 * numberOfItems);
            setPienetMantylevyt(pienetMantylevyt + 1 * numberOfItems);
            setRuuvit(ruuvit + 4 * numberOfItems);
            setVetimet(vetimet + 1 * numberOfItems);
        };
        if (selectedItem === "Kaappi") {
            itemComponents = ["x1 iso mäntylevy", "x1 vanerilevy", "x2 vedin", "x20 ruuvi", "x2 hyllylevy"];
            setIsotMantylevyt(isotMantylevyt + 1 * numberOfItems);
            setVanerilevyt(vanerilevyt + 1 * numberOfItems);
            setVetimet(vetimet + 2 * numberOfItems);
            setRuuvit(ruuvit + 20 * numberOfItems);
            setHyllylevyt(hyllylevyt + 2 * numberOfItems);
        };
        const newFurnitureListing = {
            id: newID,
            pvm: startDate,
            name: selectedItem,
            itemComponents: itemComponents,
            numberOfItems: numberOfItems
        };
        const tempList = [...newFurnitureList];
        tempList.push(newFurnitureListing);
        setNewFurnitureList(tempList);
        setSelectedItem("Vitriini");
        setNumberOfItems(1);
    };

    //Huonekalun poisto huonekalukorista
    const handleDeleteListItem = (id, itemNumber, itemName) => {
        if (itemName === "Vitriini") {
            setLasiovet(lasiovet - 2 * itemNumber);
            setVanerilevyt(vanerilevyt - 1 * itemNumber);
            setHyllylevyt(hyllylevyt - 1 * itemNumber);
            setRuuvit(ruuvit - 16 * itemNumber);
            setVetimet(vetimet - 2 * itemNumber);
        };
        if (itemName === "Tuoli") {
            setKangaspalat(kangaspalat - 1 * itemNumber);
            setRuuvit(ruuvit - 8 * itemNumber);
            setKoivulankut(koivulankut - 3 * itemNumber);
        };
        if (itemName === "Sivupöytä") {
            setKoivulankut(koivulankut - 1.4 * itemNumber);
            setPienetMantylevyt(pienetMantylevyt - 1 * itemNumber);
            setRuuvit(ruuvit - 4 * itemNumber);
            setVetimet(vetimet - 1 * itemNumber);
        };
        if (itemName === "Kaappi") {
            setIsotMantylevyt(isotMantylevyt - 1 * itemNumber);
            setVanerilevyt(vanerilevyt - 1 * itemNumber);
            setVetimet(vetimet - 2 * itemNumber);
            setRuuvit(ruuvit - 20 * itemNumber);
            setHyllylevyt(hyllylevyt - 2 * itemNumber);
        };
        const tempList = newFurnitureList.filter(item => item.id !== id);
        setNewFurnitureList(tempList);
    };

    //Tulostettavan listan luonti
    const handleSaveList = () => {
        const newPdfList = {
            pvm: startDate,
            ruuvit: ruuvit,
            vetimet: vetimet,
            kangaspalat: kangaspalat,
            isotMantylevyt: isotMantylevyt,
            pienetMantylevyt: pienetMantylevyt,
            hyllylevyt: hyllylevyt,
            vanerilevyt: vanerilevyt,
            koivulankut: koivulankut,
            lasiovet: lasiovet
        };
        setPdfLists(newPdfList);
        setNewFurnitureList([]);
        setPienetMantylevyt(0);
        setLasiovet(0);
        setRuuvit(0);
        setVetimet(0);
        setKangaspalat(0);
        setKoivulankut(0);
        setIsotMantylevyt(0);
        setVanerilevyt(0);
        setHyllylevyt(0);
        setNumberOfItems(1);
        setSelectedItem("Vitriini");
    };

    return (
        <>
           <div className="Selections-container">
            <BsArrowsMove className="arrow-icon"/>
            <img src={listIcon} alt='list-icon' className="image" />
            <h1 className="card-title">UUSI LISTA</h1>
            <div className="Selection-fields">
                <Kalenteri setStartDate={setStartDate} startDate={startDate} />
                <div className="furniture-select">
                        <Form.Group controlId="formBasicSelect" >
                            Valitse huonekalu:
                            <Form.Control
                                as="select"
                                value={selectedItem}
                                onChange={e => {
                                    setSelectedItem(e.target.value);
                                }}
                            >
                            <option value="Vitriini">Vitriini</option>
                            <option value="Tuoli">Tuoli</option>
                            <option value="Sivupöytä">Sivupöytä</option>
                            <option value="Kaappi">Kaappi</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    Valitse lukumäärä:
                    <div>
                        <input type="number" min="1" value={numberOfItems} onChange={(e) => setNumberOfItems(e.target.value)}></input>
                    </div>
            </div>
                <button onClick={handleAddNew} className="add-button roundCorner">Lisää</button>
            </div>
            <ListaEsineet 
                newFurnitureList={newFurnitureList} 
                handleDeleteListItem={handleDeleteListItem} 
            />
            { newFurnitureList.length > 0 && <button onClick={handleSaveList} className="create-button roundCorner">Luo lista</button> }
        </>
    )
}

export default LuoLista;
