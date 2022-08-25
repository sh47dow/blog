import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'

type Props = {
  title: string
  picture: string
    created_at: string
  author: string
}

const PostHeader = ({ title, picture, created_at, author }: Props) => {
    console.log('*******************post-header')
    console.log(created_at)
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={picture} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={created_at} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
