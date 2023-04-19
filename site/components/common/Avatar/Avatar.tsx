import { useUserAvatar } from '@lib/hooks/useUserAvatar';
import Image from 'next/image';
import { FC, useRef } from 'react';

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
      {/*
      // eslint-disable-next-line @next/next/no-img-element 
      */}
      <Image
        src={'/puppies/puppy_icon_3.png'}
        alt="User Avatar"
        height={scale * 32}
        width={scale * 32}
        className="object-cover w-full h-full rounded-full"
      />
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
