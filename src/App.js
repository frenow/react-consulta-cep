import React, { useState, useEffect } from 'react';
import Downshift from "downshift";
import axios from "axios";

const App = () => {

  const[endereco, setEndereco] = useState([]);
  const[logradouro, setLogradouro] = useState();
  

  function inputOnChange(event) {
    if (!event.target.value) {
      return;
    }
    fetchMovies(event.target.value);
  }

  function downshiftOnChange(selectedMovie) {
    alert(`your favourite movie is ${selectedMovie.title}`);
  }  

  function fetchMovies(rua) {
    const viacepURL = `viacep.com.br/ws/MG/Belo Horizonte/${rua}/json/`;
    axios.get(viacepURL).then(response => {
      setEndereco(response.data);
      
      console.log(endereco);
    });
  }  
  return (
    <div className="App">
      <Downshift
        onChange={downshiftOnChange}
        itemToString={item => (item ? logradouro : "")}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          getLabelProps
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
              Pesquisa de Endereço
            </label>{" "}
            <br />
            <input
              {...getInputProps({
                placeholder: "Digite o endereço",
                onChange: inputOnChange
              })}
            />
            {isOpen ? (
              <div className="downshift-dropdown">
                {endereco.logradouro
                  .filter(
                    item =>
                      !inputValue ||
                      item.logradouro
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }}
                    >
                      {item.logradouro}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>

    </div>
  );
}

export default App;
