import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  picture: string
  created_at: string
  excerpt: string
  author: string
  slug: string
}

const PostPreview = ({
  title,
  picture,
  created_at,
  excerpt,
  author,
  slug,
}: Props) => {
    console.log("************post-preview")
    console.log(created_at)
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={picture} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={created_at} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author}/>
    </div>
  )
}

export default PostPreview
