import { createContext, useContext, useEffect, useState } from "react";

// UI -> ThemeContext -> localStorage

const ThemeContext = createContext({theme: 'light'});

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if(!theme) throw new Error("Контекст не подключен");
    return theme;
}

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        const themeInStorage = localStorage.getItem('theme');
        if(themeInStorage) return themeInStorage;
        return 'light';
    })

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    const toogleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

    return <ThemeContext.Provider value={{theme, toogleTheme, setTheme}}>
        {children}
    </ThemeContext.Provider>
}