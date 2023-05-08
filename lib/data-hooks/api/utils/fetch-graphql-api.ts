// @ts-nocheck
import { Response } from '@vercel/fetch'
import { getConfig } from '..'
import type { GraphQLFetcher } from '../../commerce/api'
import { FetcherError } from '../../commerce/utils/errors'
import { BigcommerceNetworkError } from './errors'
import fetch from './fetch'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables, preview } = {},
  fetchOptions
) => {
  const config = getConfig()
  let res: any = Response
  try {
    res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
      ...fetchOptions,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        ...fetchOptions?.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  } catch (error) {
    throw new BigcommerceNetworkError(
      `Fetch to Bigcommerce GraphQL [${
        config.commerceUrl + (preview ? '/preview' : '')
      }] failed: ${error}`
    )
  }

  const json = await res.json()
  if (json.errors) {
    throw new FetcherError({
      errors: json.errors ?? [{ message: 'Failed to fetch Bigcommerce API' }],
      status: res.status,
    })
  }

  return { data: json.data, res }
}

export default fetchGraphqlApi
