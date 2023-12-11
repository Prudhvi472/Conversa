import { Toaster } from "react-hot-toast";

import { FC } from 'react'

interface ToasterContextProps {
  
}

const ToasterContext: FC<ToasterContextProps> = ({}) => {
  return ( 
     <Toaster />
    );
}

export default ToasterContext ;