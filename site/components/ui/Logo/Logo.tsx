// import Image from 'next/image'

// const Logo = ({ className = '', ...props }) => (
//   <Image
//     src="/bhpuplogo-v2.jpeg"
//     alt='Image of logo'
//     width={347}
//     height={39}
//   />
// )

// export default Logo

import InsigniaLogo from "./InsigniaLogo";
import LongLogo from "./LongLogo";

const Logo = ({ className = '', ...props }) => {
  return (
    <div className={className}>
      <LongLogo
        color="#000"
        width={350}
        height={39}
        className="hidden md:block"
      />
      <InsigniaLogo
        color="#000"
        width={39}
        height={39}
        className="block md:hidden"
      />
    </div>
  )
}
export default Logo
