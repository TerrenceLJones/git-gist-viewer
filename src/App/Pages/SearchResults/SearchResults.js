import React from 'react';

function makeSearchItems(item) {
    const imgStyles = {
        borderRadius: '50px',
        height: '50px',
        width: '50px'
    };

    const itemStyles = {
        height: '100px',
        margin: '20px',
        width: '100px'
    };

    return (
        <li key={item.id} id={item.login} style={itemStyles}>
            <img style={imgStyles} src={`${item.avatar_url}`} alt="" />
            <p>{item.login}</p>
        </li>
    );
}

const SearchResults = (props) => {
    const { results, handleSearchItemClick } = props
    const listStyles = {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    };

    return (
        <ul style={listStyles} onClick={handleSearchItemClick}>
            {results.map(makeSearchItems)}
        </ul>
    );
}
export default SearchResults;

// back button doesn't update search input
