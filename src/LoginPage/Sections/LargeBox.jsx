import LoginNav from "./Partials/LoginNav";
import { StyledLargeBox } from "./Partials/StyledLargeBox";

function LargeBox ({className, children}) {
    
    return(
      <StyledLargeBox className={className}>
        <LoginNav />
        {children}
      </StyledLargeBox>
    )
}

export default LargeBox