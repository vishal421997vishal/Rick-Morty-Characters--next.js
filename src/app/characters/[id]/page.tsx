'use client'

import React from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Character} from '@/core/interface/CharacterInterface'; // adjust as needed
import {useFetchCharacter} from "@/services/character-api/useCharacterApi";

export default function CharacterDetail() {
  const {id} = useParams();
  const router = useRouter();

  const {data, isLoading} = useFetchCharacter(String(id));
  const character: Character | undefined = data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-lg font-medium">Loading character...</span>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Character not found.
      </div>
    );
  }

  const createdDate = new Date(character.created).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-10 px-6 flex flex-col items-center">
      <div
        className="w-full max-w-4xl bg-white border-2 border-black rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-gray-200">
          <img
            src={character.image}
            alt={character.name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-4">
              {character.name}
            </h1>
            <ul className="text-gray-800 text-md space-y-2">
              <li><strong>Status:</strong> {character.status}</li>
              <li><strong>Species:</strong> {character.species}</li>
              <li><strong>Gender:</strong> {character.gender}</li>
              <li><strong>Origin:</strong> {character.origin.name}</li>
              <li><strong>Location:</strong> {character.location.name}</li>
              <li><strong>Created At:</strong> {createdDate}</li>
            </ul>
          </div>

          <div className="mt-6">
            <div className="mt-6">
              <button
                onClick={() => router.back()}
                className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-gray-400 text-gray-800 font-medium rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200">
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
