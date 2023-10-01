import type { CodegenConfig } from "@graphql-codegen/cli"
import { join } from "path"

const config: CodegenConfig = {
  schema: join(__dirname, "./schema.gql"),
  generates: {
    [join(__dirname, "./resolvers-types.ts")]: {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
}

export default config
