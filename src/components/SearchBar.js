import React, { useState } from 'react';



function SearchBar(props) {

    const [query, setQuery] = useState("Search by city")

    const changeHandler = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div className="search">
            <h1>Searchbar</h1>
            <input onChange={changeHandler} type="text" placeholder={query} />
            <button onClick={() => props.searchByLocation(query)}>Search</button>
            <button onClick={() => props.getTweetsNearMe()}>Get tweets near me</button>
        </div>
    );
}

export default SearchBar;
