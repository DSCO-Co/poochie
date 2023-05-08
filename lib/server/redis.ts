import { Redis } from '@upstash/redis'

interface DataObject {
  bcCartID: string
  ip?: string
  segmentAnonymousID: string
  ua?: string
  cookies?: Record<string, any>
}

export class RedisClient {
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      url: 'https://steady-ladybug-30806.upstash.io',
      token:
        'AXhWASQgODMxOTgzNjUtNDJhYy00NGRmLThlMGEtZDBhMmI3OGQ0NzA2MDZiMThkNjhhNzNmNGU0ZDgwYzc3OTQ4YWMzNGZmZDk=',
    })
  }

  async stash(cartId: string, data: DataObject): Promise<void> {
    await this.redis.set(`cart:${cartId}:data`, JSON.stringify(data))
  }

  async unstash(cartId: string): Promise<any> {
    const data = await this.redis.get(`cart:${cartId}:data`)
    // @ts-ignore
    const parsedData: DataObject = JSON.parse(data)
    return parsedData
  }

  async printEntireCache(): Promise<void> {
    let cursor = 0
    do {
      const result = await this.redis.scan(cursor, {
        match: '*',
        count: 100,
      })
      cursor = result[0]
      const keys = result[1]

      if (keys.length > 0) {
        for (const key of keys) {
          const value = await this.redis.get(key)
          console.log(`${key}: ${value}`)
        }
      }
    } while (cursor !== 0)
  }
}
