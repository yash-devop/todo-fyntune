import { createContext, useContext, useState } from "react";

type ModalContextType = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ModalContext = createContext<ModalContextType | null>({
    open: false,
    setOpen: ()=>{}
});

export const ModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <ModalContext.Provider value={{open ,setOpen}}>{children}</ModalContext.Provider>
  )
};

export const useModal=()=>{
    const context = useContext(ModalContext);

    if(!context){
        throw new Error("useModal must be wrapped inside the ModalProvider")
    }
    return context
}
