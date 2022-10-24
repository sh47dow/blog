import type Author from './author'

type PostType = {
  id: string
  title: string
  created_at?: string
  picture: string
  // author: string
  excerpt: string
  content: string
}

export default PostType
