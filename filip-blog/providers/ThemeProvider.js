import {ThemeContext, themes} from "context/ThemeContext";
import {useContext, useMemo, useState} from "react";

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(themes.light);

    const toggleTheme = () => {
        setTheme(theme === themes.dark
            ? themes.light
            : themes.dark
        )
    }

    const themeAPI = useMemo(() => {
        return {
            theme,
            toggleTheme
        }
    }, [theme, toggleTheme])

    return (
        <ThemeContext.Provider value={themeAPI}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;