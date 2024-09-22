import { ThemeProvider } from "./LightDarkModeThemeProvider";
import { Toaster } from "@/components/ui/toaster";


const Provider = ({children}) => {
  return (
    <>
      
      <Toaster />

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

        {children}

      </ThemeProvider>
      
    </>
  )
}


export default Provider;

// a) enableSystem => This prop allows the theme to automatically sync with the user's system theme 
// preferences. If the user changes their system theme from light to dark (or vice versa), the 
// application will automatically update to reflect this change when enableSystem is true.


// b) disableTransitionOnChange => Normally, when the theme changes (e.g., from light to dark), CSS 
// transitions might cause flickering or unwanted animations. disableTransitionOnChange prevents 
// these transitions from occurring during the theme change, resulting in an instant theme switch 
// with no visible transition effect.


// c) attribute="class" => This prop determines how the theme (light or dark) is applied to your 
// application. When set to "class", the ThemeProvider will add a class to the html element (e.g., 
// class="dark" for dark mode, class="light" for light mode). This allows you to write CSS targeting 
// these classes, enabling different styles based on the theme.