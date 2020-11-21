import { useState } from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

import { getCelebrities } from './celebrities'
import { addAvatars } from './avatars'

const celebrities = addAvatars(getCelebrities())

function App() {
  const [searchString, setSearchString] = useState("")

  return (
    <>
      <SearchBar setSearchString={setSearchString} />
      <SearchResults searchResults={search(searchString)} />
    </>
  );
}

function search(searchString) {
  const stringToFind = searchString.trim().toLowerCase()

  const searchResults = celebrities.filter(
    (celebrity) => celebrity.label.toLowerCase().indexOf(stringToFind) !== -1
  )

  return searchResults
}

export default App;
