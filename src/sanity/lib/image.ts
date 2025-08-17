import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForImageWithSize = (source: Image, width: number, height?: number) => {
  const builder = imageBuilder?.image(source).auto('format').fit('crop')
  
  if (height) {
    return builder.width(width).height(height)
  }
  
  return builder.width(width)
}