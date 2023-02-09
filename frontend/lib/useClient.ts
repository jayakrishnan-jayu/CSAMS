import * as React from "react"
import { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from "urql"

/**
 * Get GraphQL Client in browser environments (frontend).
 *
 * If the user has an active session, it will add an accessToken to all requests
 */
const useClient = (options?: RequestInit) => {
  //   const { data: session } = useSession()

  //   const token = session?.accessToken

  return React.useMemo(() => {
    const isServerSide = typeof window === "undefined"
    const ssrCache = ssrExchange({
      isClient: !isServerSide,
    })

    const client = createClient({
      // TODO: add production url as env and local url as default
      url: "/api/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      fetchOptions: () => {
        return {
          headers: {},
        }
      },
    })

    return client
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])
}

export default useClient
