import { FC, useRef } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'

interface Props {
  className?: string
  children?: any
  scale?: number
}

const Avatar: FC<Props> = ({ scale = 1 }) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { userAvatar } = useUserAvatar()
  let size = 8 * scale

  return (
    <div
      ref={ref}
      className={`inline-block rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear h-${size} w-${size}`}
    >
      <img
        src={userAvatar}
        alt="User Avatar"
        className="rounded-full h-full w-full object-cover"
      />
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
