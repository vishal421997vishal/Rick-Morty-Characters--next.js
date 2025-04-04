import {useQuery} from "@tanstack/react-query";
import {fetchCharacterById, fetchCharactersApi} from "./characterApi";
import {Character, CharacterInterface} from "@/core/interface/CharacterInterface";

export const useFetchCharactersApi = (page: number) => {
  return useQuery<CharacterInterface>({
    queryKey: ['characters', {page}],
    queryFn: () => fetchCharactersApi(page),
    retry: false,
    staleTime: 0,
  });
};

export const useFetchCharacter = (characterId: any) => {
  return useQuery<Character>({
    queryKey: ['characters', {id: characterId}],
    queryFn: () => fetchCharacterById(characterId),
    enabled: !!characterId
  })
}
