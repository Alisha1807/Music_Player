//!By using cards
import React, { useState } from "react";
import PRODUCTS from "./products.json";
import "./Global.css";

const Main = () => {
  let [state, setState] = useState(PRODUCTS);
  // let [filteredName, setFilteredName] = useState([]);
  let [searchText, setSearchText] = useState("");

  return (
    <React.Fragment>
      <h1>Product Details</h1>
      <input
        type="text"
        className="searchBox"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(searchText);
          const filteredList = state.filter((prod) => {
            prod.Maker.includes(searchText);
          });
          setState(filteredList);
        }}
      >
        Search
      </button>

      <section>
        <div className="innerdiv">
          {searchText.map((m) => {
            return (
              <div className="container">
                <div className="images">
                  <img src={m.img} alt={m.img} />
                </div>
                <div className="data">
                  <p className="id">{m.Id}</p>
                  <p className="maker">{m.Maker}</p>
                  <p className="title">{m.Title}</p>
                  <p className="url">
                    <a href={m.Url}>LINK</a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};
export default Main;
