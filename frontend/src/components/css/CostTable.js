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

  const addNewCost = () => {
    setFishes(prevFishes => [...prevFishes, { name: "", number: 0 }]);
  };

  /* const getTotalCosts = () => {
    return costs.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  }; */

  return (
      <div>      
          {fishes.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">
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
              <button onClick={addNewCost}>+</button>
            </div>
        </div>
  );
};

export default CostTable;
