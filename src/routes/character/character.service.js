import fetch from "node-fetch";

export const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api";
export const CHARACTER_ENDPOINT = `/character`;

export async function getCharacters() {
  const response = await fetch(`${RICK_AND_MORTY_API}${CHARACTER_ENDPOINT}`);
  const data = await response.json();
  return data;
}

export async function getCharacter(id) {
  const response = await fetch(
    `${RICK_AND_MORTY_API}${CHARACTER_ENDPOINT}/${id}`
  );
  const data = await response.json();
  return data;
}
