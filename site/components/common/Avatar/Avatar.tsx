import { FC, useRef } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'

interface Props {
  className?: string
  children?: any
  scale?: number
}

const Avatar: FC<Props> = ({ scale = 2.5 }) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { userAvatar } = useUserAvatar()

  return (
    <div
      ref={ref}
      style={{ height: `${scale}rem`, width: `${scale}rem` }}
      className={`inline-block rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear`}
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
