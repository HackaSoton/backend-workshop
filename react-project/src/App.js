import { useState, useEffect } from 'react'
import http from './httpClient'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'


function App() {
  const [celebrities, setCelebrities] = useState([])

  useEffect(() => {
    async function fetchCelebrities() {
      const res = await http.get('/celebrity')
      setCelebrities(res.data)
    }
    fetchCelebrities()
  }, [])

  return (
    <>
      <SearchBar searchFn={updateCelebrities(setCelebrities)} />
      <SearchResults searchResults={celebrities} />
    </>
  );
}

function updateCelebrities(setCelebrities) {
  let updateTimeout
  return (searchString) => {
    if (updateTimeout) {
      clearTimeout(updateTimeout)
    }
    updateTimeout = setTimeout(async () => {
      const res = await http.get('/celebrity', {
        params: {
          name: searchString
        }
      }) 
      updateTimeout = undefined
      setCelebrities(res.data)
    }, 50)
  }
}

export default App;
