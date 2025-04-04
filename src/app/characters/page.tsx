'use client'

import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Character } from '@/core/interface/CharacterInterface'
import { useFetchCharactersApi } from '@/services/character-api/useCharacterApi'

export default function Characters() {
  const [page, setPage] = useState(1)
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [search, setSearch] = useState('')

  const { data, isLoading } = useFetchCharactersApi(page)
  const { ref, inView } = useInView()

  useEffect(() => {
    setPage(1)
    setAllCharacters([])
  }, [])

  useEffect(() => {
    if (data?.results) {
      setAllCharacters((prev) => {
        if (page === 1) {
          return data.results
        }
        const map = new Map(prev.map((char) => [char.id, char]))
        for (const char of data.results) {
          map.set(char.id, char)
        }
        return Array.from(map.values())
      })
    }
  }, [data, page])

  useEffect(() => {
    if (inView && !isLoading && data?.info?.next) {
      setPage((prev) => prev + 1)
    }
  }, [inView, isLoading, data])

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, allCharacters])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-20 bg-black/40 text-white py-4 mb-4 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center">Rick & Morty Characters</h1>
        <div className="mt-4 max-w-md mx-auto px-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-5">
        {filteredCharacters.map((character) => {
          const createdDate = new Date(character.created).toLocaleDateString()

          return (
            <Link href={`/characters/${character.id}`} key={`char-${character.id}`}>
              <div className="group relative overflow-hidden border-4 border-black bg-white shadow-md hover:scale-105 transition-transform cursor-pointer">
                <img src={character.image} alt={character.name} className="w-full" />
                <div className="absolute bottom-0 right-0 text-sm sm:text-base font-bold italic shadow text-right z-10 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="bg-white px-2 py-1 border-t-2 border-l-2 border-gray-500">{character.name}</p>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 z-20">
                  <span className="absolute top-0 right-0 bg-white text-xs sm:text-sm px-1 py-[2px] rounded text-gray-700 font-medium">
                    {createdDate}
                  </span>
                  <p className="text-white text-lg sm:text-xl font-bold italic">{character.name}</p>
                  <p className="text-white text-sm sm:text-md">{character.status} · {character.species}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div ref={ref} className="h-12 flex items-center justify-center mt-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <span>Loading more characters...</span>
          </div>
        ) : (
          !data?.info?.next && <p className="text-gray-400">No more characters</p>
        )}
      </div>
    </div>
  )
}
