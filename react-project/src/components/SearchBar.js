import "./SearchBar.css"

export default function SearchBar({ searchFn }) {
    return (
      <div id="search-container">
          <input 
              onChange={(event) => searchFn(event.target.value)}
              type="search"
              id="search-bar"
              placeholder="Search something!" />
      </div>
    )
}