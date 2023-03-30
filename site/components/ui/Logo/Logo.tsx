import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <Image
    src="/bhpuplogo-v2.jpeg"
    alt='Image of logo'
    width={347}
    height={39}
  />
)

export default Logo
