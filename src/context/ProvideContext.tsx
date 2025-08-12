
import { DashboardContext } from "./CreateContext"


interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider = ({children}: DashboardProviderProps) => {


    const sharedValues = {}

    return (
        <DashboardContext.Provider value = {sharedValues}  >
            {children}
        </DashboardContext.Provider>
    )
}