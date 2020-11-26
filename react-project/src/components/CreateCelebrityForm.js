import { useState } from 'react'

import "./CreateCelebrityForm.css"

export default function CreateCelebrityForm({ createFn }) {
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState(null)

  const createCelebrity = () => {
    createFn(name, avatar)
  }

  return (
    <div id="create-celebrity-form">
      <form>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="create-celebrity-name"
          placeholder="Name"
        />
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          id="create-celebrity-avatar"
        />
        <button
          id="create-celebrity-button"
          onClick={createCelebrity}
        >
          Create
        </button>
      </form>
    </div>
  )
}