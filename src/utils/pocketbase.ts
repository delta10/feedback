import PocketBase from 'pocketbase'

console.log('PocketBase URL in Vercel:', import.meta.env.PUBLIC_POCKETBASE_URL)

const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL)

export default pb
