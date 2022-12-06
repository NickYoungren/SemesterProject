import React, { useState } from 'react';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");


  const handleFilter = (event) => {
    var specialChar = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    var digit = new RegExp(/^\d+$/);

    const searchWord = event.target.value;
    setWordEntered(searchWord);
    
    console.log(searchWord.length)
    const newFilter = data.filter((value) => { 
      return value.Name.toLowerCase().includes(searchWord.toLowerCase());
    });
    
    if(searchWord.length > 30) {
      setWordEntered([""])
      alert("Enter a product less than 30 characters")
    }

    if(specialChar.test(searchWord)){
      setWordEntered([""])
      alert("Special characters are not allowed")
    }

    if(digit.test(searchWord)){
      setWordEntered([""])
      alert("Numbers are not allowed")
    }
    
    if (searchWord === "") {
      setFilteredData([])
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([])
    setWordEntered("")
  };
  
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
        <div className="searchIcon">
          {filteredData.length === 0 ? ( 
            <SearchIcon />
          ) : ( 
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
          
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.Link} target="_blank">
                <p>{value.Name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar
