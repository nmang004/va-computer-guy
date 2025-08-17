import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false for real-time updates
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for write operations
  token: process.env.SANITY_API_WRITE_TOKEN,
})