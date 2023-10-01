import yoga from "@elysiajs/graphql-yoga"
import Elysia from "elysia"
import { parseCookie } from "./utils/http"
import { join } from "path"
import type { Resolvers } from "./gql/resolvers-types"

const schemaFile = Bun.file(join(import.meta.dir, "./schema.gql"))

const typeDefs = await schemaFile.text()
const resolvers: Resolvers = {
  Query: { version: () => "v1:0.0.1" },
}

const v1 = (app: Elysia<"/v1">) => {
  app.use(
    yoga({
      context: (initialContext) => {
        const cookies = parseCookie(
          initialContext.request.headers.get("Cookie") ?? "",
        )

        return initialContext
      },
      typeDefs,
      resolvers,
    }),
  )

  return app
}

export default v1
