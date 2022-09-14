import fs from "fs/promises"
import { fetchLinks } from "./index.mjs"

async function main () {
  const links = await fetchLinks();

  fs.writeFile("shortlinks.json", JSON.stringify(links))
}

main();