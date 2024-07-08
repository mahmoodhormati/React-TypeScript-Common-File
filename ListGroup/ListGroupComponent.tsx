import { useState } from "react";
import { ListGroupProps } from "./ListGroupProps";
import "./ListGroup.scss";

function ListGroupComponent({ heading, description, items }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      <p>{description}</p>
      {items.length === 0 && <p>No Items Found!</p>}
      <ol className="list-group list-group-component">
        {items.map((t, index) => (
          <li
            className={`list-group-item ${selectedIndex === index && "active"}`}
            key={t.id}
            onClick={() => {
              setSelectedIndex(index);
              t.onItemSelected !== undefined && t.onItemSelected(t.id);
            }}
          >
            {t.name}
          </li>
        ))}
      </ol>
    </>
  );
}

export default ListGroupComponent;
