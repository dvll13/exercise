import { createContext, useContext, useState } from 'react'

interface IAppContext {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  pageId: string | null
  setPageId: (id: string) => void
}

const IAppContext = createContext<IAppContext | null>(null)

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [pageId, setPageId] = useState<IAppContext['pageId']>(null)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const value: IAppContext = {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    pageId,
    setPageId,
  }

  return <IAppContext.Provider value={value}>{children}</IAppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(IAppContext) as IAppContext
