import type { RequestInit } from '@vercel/fetch';
export default function fetchStoreApi<T>(endpoint: string, options?: RequestInit): Promise<T>;
