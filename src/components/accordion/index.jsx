import { useState } from "react";
import "./style.css";
import data from "./data.js";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultipleSelection = (getCurrentId) => {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(cpyMultiple);
  };

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection ? "Disable" : "Enable"} Multiple Selection
      </button>

      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            const isOpen = enableMultiSelection
              ? multiple.includes(dataItem.id)
              : selected === dataItem.id;

            return (
              <div className="item" key={dataItem.id}>
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultipleSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>{isOpen ? "-" : "+"}</span>
                </div>

                
                  <div className={`content-wrapper ${isOpen ? "open" : ""}`}>
                    <div className="content">{dataItem.answer}</div>
                  </div>
              </div>
            );
          })
        ) : (
          <div>No Data Found!!!</div>
        )}
      </div>
    </div>
  );
}
