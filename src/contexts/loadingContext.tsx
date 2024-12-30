import { createContext, useState } from "react";

export const LoadingContext = createContext({loading: false, changeLoading: (loading: boolean) => {}});

export default function LoadingContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
const [loading, setLoading] = useState<boolean>(false);

function changeLoading(loading: boolean) {
setLoading(loading)
}

return (
<LoadingContext.Provider value={{ loading, changeLoading }}>
    {children}
</LoadingContext.Provider>
);
}