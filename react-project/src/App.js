import { useState, useEffect } from 'react'
import http from './httpClient'
import SearchBar from './components/SearchBar'
import CreateCelebrityForm from './components/CreateCelebrityForm'
import SearchResults from './components/SearchResults'

import './App.css'

function App() {
  const [celebrities, setCelebrities] = useState([])

  useEffect(() => {
    async function fetchCelebrities() {
      const res = await http.get('/celebrity')
      setCelebrities(res.data)
    }
    fetchCelebrities()
  }, [])

  const searchFn = searchCelebrities(setCelebrities)

  return (
    <>
      <div id='app-header'>
        <SearchBar searchFn={searchFn} />
        <CreateCelebrityForm createFn={createCelebrity(searchFn)} />
      </div>
      <SearchResults searchResults={celebrities} />
    </>
  );
}

function searchCelebrities(setCelebrities) {
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

function createCelebrity(searchFn) {
  return async (name, avatar) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('avatar', avatar)

    await http.post('/celebrity', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    searchFn('')
  }
}

export default App;
