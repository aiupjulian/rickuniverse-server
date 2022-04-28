import {
  getCharacterFromApi,
  getCharactersFromApi,
} from "./character.service.js";
import { getFavs } from "../user/user.controller.js";

function getCharacterWithFav(character, favs) {
  return {
    ...character,
    fav: favs.includes(character.id),
  };
}

export async function getCharacters(username) {
  const characters = await getCharactersFromApi();
  const favs = await getFavs(username);
  return {
    ...characters,
    results: characters.results.map((character) =>
      getCharacterWithFav(character, favs)
    ),
  };
}

export async function getCharacter(username, id) {
  const character = await getCharacterFromApi(id);
  const favs = await getFavs(username);
  return getCharacterWithFav(character, favs);
}
