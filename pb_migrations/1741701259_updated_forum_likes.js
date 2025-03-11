/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2706361310")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"\n",
    "deleteRule": "@request.auth.id != \"\"\n",
    "updateRule": "@request.auth.id != \"\"\n"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2706361310")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": ""
  }, collection)

  return app.save(collection)
})
