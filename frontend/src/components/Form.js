/* eslint-disable react/jsx-key */
import React, { useState } from "react";

//import "./css/CostTable.css";

const _defaultFishes = [
  {
    name: "アジ",
    number: 2
  },
  {
    name: "サバ",
    number: 6
  }
];

const CostTable = () => {
  const [fishes, setFishes] = useState(_defaultFishes);

  const handleCostsChange = event => {
    const _tempFishes = [...fishes];
    _tempFishes[event.target.dataset.id][event.target.name] = event.target.value;

    setFishes(_tempFishes);
  };

  const addNewInputs = () => {
    setFishes(prevFishes => [...prevFishes, { name: "", number: 0 }]);
  };
  /* const getTotalCosts = () => {
    return costs.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  }; */

  return (
    <div className="table">
      <div className="table-content">
        <div className="table-body">
          {fishes.map((item, index) => (
            <div >
              <div>
                <input
                  name="name"
                  data-id={index}
                  type="text"
                  value={item.name}
                  onChange={handleCostsChange}
                />
              </div>
              <div className="table-data">
                <input
                  name="price"
                  data-id={index}
                  type="number"
                  value={item.number}
                  onChange={handleCostsChange}
                />
              </div>
            </div>
          ))}
          <div className="table-data">
            <button onClick={addNewInputs}>+</button>
          </div>
          {/*  <div className="table-data">
              <div>{getTotalCosts()}</div>
            </div> */}
        </div>
      </div>
    </div>
        
  );
};

export default CostTable;
