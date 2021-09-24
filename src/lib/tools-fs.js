import fs from "fs-extra"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const { readJSON, writeJSON } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const movieJSONPath = join(dataFolderPath, "movie.json")


export const getMovies = () => readJSON(movieJSONPath)
export const writeMovies = content => writeJSON(movieJSONPath, content)
