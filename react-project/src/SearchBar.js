import "./SearchBar.css"

export default function SearchBar({ setSearchString }) {
    return (
      <div id="search-container">
          <input 
              onChange={(event) => setSearchString(event.target.value)}
              type="search"
              id="search-bar"
              placeholder="Search something!" />
      </div>
    )
}