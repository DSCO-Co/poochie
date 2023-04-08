

import InsigniaLogo from "./InsigniaLogo";
import LongLogo from "./LongLogo";

const Logo = ({ className = '', ...props }) => {
  return (
    <div className={className}>
      <LongLogo
        color="#2D3F50"
        width={350}
        height={39}
        className="hidden md:block"
      />
      <InsigniaLogo
        color="#2D3F50"
        width={39}
        height={39}
        className="block md:hidden"
      />
    </div>
  )
}
export default Logo
