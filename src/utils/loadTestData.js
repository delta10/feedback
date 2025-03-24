import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

await pb
  .collection('_superusers')
  .authWithPassword('admin@example.com', 'password')

await pb.backups.restore('testdata.zip')
