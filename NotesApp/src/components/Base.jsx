import CustomNavbar from "./CustomNavbar";

const Base = ({title="Welcome to our website",children}) => {
  return (
    
    <>
      <CustomNavbar/>
      {children}
        
    </>
  )
}

export default Base;