import yoga from "@elysiajs/graphql-yoga"
import Elysia from "elysia"
import { parseCookie } from "./utils/http"
import { join } from "path"
import { Resolvers } from "./resolvers-types"
import { GraphQLScalarType, Kind } from "graphql"

const schemaFile = Bun.file(join(import.meta.dir, "./schema.graphql"))

const typeDefs = await schemaFile.text()

const resolvers: Resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    serialize(value) {
      if (value instanceof Date) return value.toISOString()

      throw Error("GraphQL Date Scalar serializer expected a `Date` object")
    },
    parseValue(value) {
      const src = isNaN(Number(value)) ? String(value) : Number(value)
      const date = new Date(src)

      if (isNaN(date.getTime()))
        throw new Error("GraphQL Date Scalar parser expected a `number`")

      return date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT || ast.kind === Kind.STRING)
        return new Date(ast.value)

      return null
    },
  }),
  Query: { version: () => "v1:0.0.1" },
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
