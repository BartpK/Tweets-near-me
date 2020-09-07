import React, { useState } from 'react';



function SearchBar(props) {

    const [query, setQuery] = useState("Search by location")

    const changeHandler = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div className="search">
            <input onChange={changeHandler} type="text" placeholder={query} />
            <button onClick={() => props.searchByLocation(query)}>Search</button>
            <button onClick={() => props.getTweetsNearMe()}><i className="fas fa-crosshairs"></i></button>
        </div>
    );
}

export default SearchBar;
