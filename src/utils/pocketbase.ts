import PocketBase from 'pocketbase'

console.log(import.meta.env.POCKETBASE_URL)

const pb = new PocketBase(import.meta.env.POCKETBASE_URL)

export default pb
