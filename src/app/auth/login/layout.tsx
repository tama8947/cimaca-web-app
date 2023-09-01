import { ChildContainerProps } from "@/components/global_types/types";

const Layout = ({ children }: ChildContainerProps) => {  
  return (
    <div className="w-full h-screen flex justify-content-center align-items-center">     
        {children}       
    </div>
  );
};

export default Layout;
