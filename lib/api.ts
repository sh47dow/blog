import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from "../interfaces/post";
import {supabase} from "../utils/supabase";

// const postsDirectory = join(process.cwd(), '_posts')

export async function getPosts(fields: string[] = ['id', 'title', 'created_at', 'picture', 'author', 'excerpt', 'content']): Promise<PostType[]> {
  // return fs.readdirSync(postsDirectory)
  const {data, error} = await supabase.from('post').select(fields.join(','));
    if (error) {
        // throw new Error('Error getting post')
        console.error(error)
    }
  return data || [];
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  // const realSlug = slug.replace(/\.md$/, '')
  // const fullPath = join(postsDirectory, `${realSlug}.md`)
  // const fileContents = fs.readFileSync(fullPath, 'utf8')
  // const { data, content } = matter(fileContents)

  const {data, error} = await supabase.from('post').select(fields.join(',')).eq('id', slug).single();
  if (error) {
    // throw new Error('Error getting post')
      console.log(error)
  }
  return data;


  // type Items = {
  //   [key: string]: string
  // }
  //
  // const items: Items = {}
  //
  // // Ensure only the minimal needed data is exposed
  // fields.forEach((field) => {
  //   if (field === 'slug') {
  //     items[field] = realSlug
  //   }
  //   if (field === 'content') {
  //     items[field] = content
  //   }
  //
  //   if (typeof data[field] !== 'undefined') {
  //     items[field] = data[field]
  //   }
  // })
  //
  // return items
}

export async function getAllPosts(fields: string[] = []) {
  const posts: PostType[] = await getPosts(fields);
  return posts
      .sort((post1, post2) => (post1.created_at > post2.created_at ? -1 : 1))
        .map((post) => {
          return {

              slug: post.id,
              ...post

          }
        })
}
