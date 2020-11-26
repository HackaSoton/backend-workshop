import "./SearchResults.css"

export default function SearchResults({ searchResults }) {
    return (
      <div id="search-results-container">
        {
          searchResults.map((celebrity) => (
            <div className="search-result" key={celebrity._id}>
              <img className="search-result-avatar" src={celebrity.avatarPath} />
              <p>{ celebrity.name }</p>
            </div>
          ))
        }
      </div>
    )
}