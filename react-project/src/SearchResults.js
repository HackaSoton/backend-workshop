import "./SearchResults.css"

export default function SearchResults({ searchResults }) {
    return (
      <div id="search-results-container">
        {
          searchResults.map((celebrity) => (
            <div className="search-result">
              <img className="search-result-avatar" src={celebrity.avatar} />
              <p>{ celebrity.label }</p>
            </div>
          ))
        }
      </div>
    )
}