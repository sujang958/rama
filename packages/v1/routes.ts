import yoga from "@elysiajs/graphql-yoga"
import Elysia from "elysia"
import { parseCookie } from "./utils/http"
import { join } from "path"
import { Resolvers } from "./resolvers-types"

const schemaFile = Bun.file(join(import.meta.dir, "./schema.graphql"))

const typeDefs = await schemaFile.text()

const resolvers: Resolvers = {
  Query: { version: () => "v1-0.0.1" },
}

// graphql-scalars

export const v1 = (app: Elysia<"/v1">) => {
  app.use(
    yoga({
      plugins: [],
      typeDefs,
      resolvers,
      async context(initialContext) {
        const cookies = parseCookie(
          initialContext.request.headers.get("Cookie") ?? "",
        )

        console.log(cookies)

        return initialContext
      },
    }),
  )

  return app
}
