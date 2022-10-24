import PostType from "../interfaces/post";
import {supabase} from "../utils/supabase";
import {message} from "antd";

export async function getPosts(fields: string[] = ['id', 'title', 'created_at', 'picture', 'author', 'excerpt', 'content']): Promise<PostType[]> {
  // return fs.readdirSync(postsDirectory)
    const res = await supabase.from('post').select<string, PostType>(fields.join(','));
    if (res.error) {
        // throw new Error('Error getting post')
        console.error(res.error)
    }
  return res.data || [];
}

export async function getPostBySlug(slug: string, fields: string[] = []) {

  const {data, error} = await supabase.from('post').select<string, PostType>(fields.join(',')).eq('id', slug).single();
  if (error) {
      console.log(error)
  }
  return data;
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

export function createPost(post: PostType) {
    return supabase.from('post').insert<PostType>(post).select<string, PostType>()
}

export function updatePost(post: PostType) {
    return supabase.from('post').update<PostType>(post).eq('id', post.id)
}

export function removePost(id: string) {
    return supabase.from('post').delete().eq('id', id)
}
