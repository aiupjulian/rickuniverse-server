import User from "./user.model.js";

export async function getFavs(username) {
  const user = await User.findOne({ username });
  return user.favs;
}

export async function addToFavs(username, characterId) {
  await User.updateOne({ username }, { $addToSet: { favs: characterId } });
}

export async function removeFromFavs(username, characterId) {
  await User.updateOne({ username }, { $pull: { favs: characterId } });
}
