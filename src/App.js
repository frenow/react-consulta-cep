import React, { useState } from 'react';
import Downshift from "downshift";
import axios from "axios";

const App = () => {

  const[endereco, setEndereco] = useState([]);
  const [cidade, setCidade] = useState('');  
  const [uf, setUf] = useState('');

  function handleChange(event){
    setUf(event.target.value);
  }
  
  function handleInputChange(event){
    setCidade(event.target.value);
  }
  function inputOnChange(event) {
    if (!event.target.value) {
      return;
    }
    fetchEnderecos(event.target.value);
  }

  function downshiftOnChange(selectedMovie) {
    //alert(`your favourite movie is ${selectedMovie.title}`);
  }  

  function fetchEnderecos(rua) {
    if (rua.length > 3) {
      const viacepURL = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;

      axios.get(viacepURL).then(response => {
        setEndereco(response.data);      
        //console.log(endereco);
     });
  }
  }  
  return (
    <>
    <div className="container">
    <div className="box">
    <label> UF
<select name="estados-brasil" onChange={handleChange}>
	<option value="AC">Acre</option>
	<option value="AL">Alagoas</option>
	<option value="AP">Amapá</option>
	<option value="AM">Amazonas</option>
	<option value="BA">Bahia</option>
	<option value="CE">Ceará</option>
	<option value="DF">Distrito Federal</option>
	<option value="ES">Espírito Santo</option>
	<option value="GO">Goiás</option>
	<option value="MA">Maranhão</option>
	<option value="MT">Mato Grosso</option>
	<option value="MS">Mato Grosso do Sul</option>
	<option value="MG">Minas Gerais</option>
	<option value="PA">Pará</option>
	<option value="PB">Paraíba</option>
	<option value="PR">Paraná</option>
	<option value="PE">Pernambuco</option>
	<option value="PI">Piauí</option>
	<option value="RJ">Rio de Janeiro</option>
	<option value="RN">Rio Grande do Norte</option>
	<option value="RS">Rio Grande do Sul</option>
	<option value="RO">Rondônia</option>
	<option value="RR">Roraima</option>
	<option value="SC">Santa Catarina</option>
	<option value="SP">São Paulo</option>
	<option value="SE">Sergipe</option>
	<option value="TO">Tocantins</option>
</select>   
</label>   
<label>Cidade<input onChange={handleInputChange} value={cidade} /></label>

      <Downshift
        onChange={downshiftOnChange}
        itemToString={item => (item ? item.logradouro : "")}
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
            <input size="50"
              {...getInputProps({
                placeholder: "Digite o endereço",
                onChange: inputOnChange
              })}
            />
            {isOpen ? (
              <div className="downshift-dropdown">

              {endereco && endereco
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
                      {item.logradouro} Bairro {item.bairro} CEP {item.cep}
                    </div>
                  ))} 

              </div>
            ) : null}
          </div>
        )}
      </Downshift>

    </div>
  </div>
    <style jsx>{`
       .container {
           width: 100vw;
           height: 100vh;
           background: #6C7A89;
           display: flex;
           flex-direction: row;
           justify-content: center;
           align-items: center
       }
       .box {
           width: 450px;
           height: 450px;
           background: #fff;
       }
       body {
          margin: 0px;
      }
    `}</style>  
</>
  );
}

export default App;
