import alek from './icons/alek.jpg'
import dan from './icons/dan.png'
import nicky from './icons/nicky.jpg'
import velina from './icons/velina.jpg'

const avatars = [
  alek,
  dan,
  nicky,
  velina
]

export function addAvatars(labels) {
  const cards = []

  for (const label of labels) {
    const avatarIndex = Math.floor(Math.random() * avatars.length)

    cards.push({
      label,
      avatar: avatars[avatarIndex]
    })
  }

  return cards
}