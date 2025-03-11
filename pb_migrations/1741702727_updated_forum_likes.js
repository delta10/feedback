/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2706361310")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2706361310")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @collection.forum_likes.user ?= @request.auth.id && @collection.forum_likes.post ?= @request.body.post"
  }, collection)

  return app.save(collection)
})
