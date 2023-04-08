

import InsigniaLogo from "./InsigniaLogo";
import LongLogo from "./LongLogo";

const Logo = ({ className = '', color = "#2D3F50", variant = "auto", ...props }) => {
  if (variant === "insignia") {
    return (
      <div className={className}>
        <InsigniaLogo
          color={color}
          width={100}
          height={39}
          className=""
        />
      </div>
    )
  } else if (variant === "long") {
    return (
      <div className={className}>
        <LongLogo
          color={color}
          width={350}
          height={39}
          className=""
        />
      </div>
    )
  } else {
    return (
      <div className={className}>
        <LongLogo
          color={color}
          width={350}
          height={39}
          className="hidden md:block"
        />
        <InsigniaLogo
          color={color}
          width={100}
          height={39}
          className="block md:hidden"
        />
      </div>
    )
  }
}
export default Logo
