import React from "react";
const ListGroup = (props) => {
    const { items, onItemSelect, textProperty, valueProperty, selectedItem } = props
    return <ul className="list-group">
        <li onClick={() => onItemSelect("")}
            className={selectedItem === '' ? 'list-group-item active' : 'list-group-item'}
        >
            {`All Genres `}
        </li>
        {items.map(
            item => <li key={item[valueProperty]}
                onClick={() => onItemSelect(item)}
                className={selectedItem === item ? 'list-group-item active' : 'list-group-item'}>
                {item[textProperty]} </li>
        )}
    </ul>
};
ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: '_id'
}


export default ListGroup;
