import React from 'react'
import { ListGroup, Badge } from 'react-bootstrap';
import { MdDeleteSweep } from 'react-icons/md';

function ListaEsineet({ newFurnitureList, handleDeleteListItem }) {
    return (
        <div className="furniture-cart">
                <ListGroup as="ol" numbered className="w-50">
                    {newFurnitureList.map(item => (
                        <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={item.id}
                        >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.name}</div>
                        <ListGroup horizontal>
                            {item.itemComponents.map((listItem, key) => (
                                <ListGroup.Item key={key}>{listItem}</ListGroup.Item>
                            ))}
                        </ListGroup>
                        </div>
                        <button className="editAndDelete" onClick={() => handleDeleteListItem(item.id,item.numberOfItems,item.name)}><MdDeleteSweep size="30px"/></button>
                        <Badge bg="custom" pill>
                            Lukumäärä: {item.numberOfItems}
                        </Badge>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
        </div>
    )
}

export default ListaEsineet
