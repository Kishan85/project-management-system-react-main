import React, { useState, createContext, useContext, useEffect } from 'react';
import classNames from "classnames";
const ThemeContext = createContext();
const ThemeUpdateContext = createContext();
const themeMode = JSON.parse(localStorage.getItem("theme"));

export function useTheme(){
    return useContext(ThemeContext);
}

export function useThemeUpdate(){
  return useContext(ThemeUpdateContext);
}


const ThemeProvider = ({...props}) => {
  
  const defaultTheme = {
    main: themeMode, //other value can be passed "softy"
    sidebarVisibility: false,
    sidebarMobile: false,
    header: "white", //other value can be passed "light,dark,theme"
    skin: themeMode, //other value can be passed "dark"
  }
  console.log(themeMode,"themeMode");
  
    const [theme, setTheme] = useState(defaultTheme);

    const themeUpdate = {
      uistyle : function(value){
        setTheme({...theme, main : value})
      },
      sidebar : function(value){
        setTheme({...theme, sidebar : value})
      },
      sidebarVisibility : function(e){
        setTheme({...theme, sidebarVisibility : !theme.sidebarVisibility})
      },
      sidebarHide : function(e){
        setTheme({...theme, sidebarVisibility : false})
      },
      header : function(value){
        setTheme({...theme, header : value})
      },
      skin : function(value){
        console.log(value,"46");
        
        setTheme({...theme, skin : value})
      },
      reset : function(e){
        setTheme({...theme, main : defaultTheme.main, sidebar: defaultTheme.sidebar, header: defaultTheme.header, skin: defaultTheme.skin })
      },
    }

    const bodyClass = classNames({
      "nk-body bg-white npc-default has-aside no-touch nk-nio-theme": true,
    });

  useEffect(() => {
    const body = document.querySelector('body');
    body.className = bodyClass;
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if(theme.main === "default"){
      body.classList.add("ui-default")
      body.classList.remove("ui-softy")
    }
    if(theme.main === "softy"){
      body.classList.add(`ui-softy`)
      body.classList.remove("ui-default")
    }
    if(theme.skin === "dark"){
      body.classList.add(`dark-mode`)
    }else{
      body.classList.remove("dark-mode")
    }
    if(theme.sidebarVisibility === true){
      body.classList.add("nav-shown")
    }else{
      body.classList.remove("nav-shown")
    }
  }, [theme]);

  useEffect(() => {
    const handleMobileSidebar = () => {
        if (window.innerWidth < 992) {
          console.log("8888",theme);
          
          setTheme({...theme, sidebarMobile : true})
        } else {
          console.log("9999",theme);
          setTheme({...theme, sidebarMobile : false, sidebarVisibility : false})
        }
    }
    handleMobileSidebar();
    window.addEventListener('resize', handleMobileSidebar);
    return () => {
     window.removeEventListener('resize', handleMobileSidebar);
    };
  }, []);
console.log(theme,"theme");

  return (
    <ThemeContext.Provider value={theme} >
      <ThemeUpdateContext.Provider value={themeUpdate}>
        {props.children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}
export default ThemeProvider;