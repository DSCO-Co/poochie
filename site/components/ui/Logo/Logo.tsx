import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <Image
    src="https://cdn11.bigcommerce.com/s-6b5ruzs4qu/images/stencil/331x42/bhpuplogo-v2_1677795304__89034.original.jpg"
    alt='Image of logo'
    width={347}
    height={39}
  />
)

export default Logo
