import { useState,useContext, createContext } from "react";

const SearchContext=createContext();
const SarchProvider=({children})=>{
    const [keyword,setkeyword]=useState({
        keyword:"",
        result:[]
    });

    return(
        <SearchContext.Provider value={[keyword,setkeyword]}>
            {children}
        </SearchContext.Provider>
    );
}
//CUSTOM HOOK
const useSearch=()=> useContext(SearchContext);

export {useSearch,SarchProvider};