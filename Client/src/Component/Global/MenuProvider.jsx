import { createContext, useContext, useState } from "react"

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [menuStatus, setMenuStatus] = useState(false)

  return (
    <MenuContext.Provider value={{ menuStatus, setMenuStatus }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)
