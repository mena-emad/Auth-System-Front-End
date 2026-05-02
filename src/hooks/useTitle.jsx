import { useEffect, useState } from "react";

export default function useTitle(){
    const [title,setTitle] = useState(document.title);
    useEffect(()=>{
        document.title = title;
    },[title])
    return setTitle
    
}