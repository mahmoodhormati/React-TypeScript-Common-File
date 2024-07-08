import { useState, useEffect } from "react";

import "./LocalSwitcher.scss";
import { useAppDispatch, useAppSelector } from "../../Services/Store/ReduxHooks";
import { SetLanguage } from "../../Services/Store/Slice/Language/LanguageSlice";
import MultiSelectComponent from "../Select/SelectComponent";
import i18n from "../Tarnslator/TransLatorHook";
const LocalSwithcerComponent = () => {

const local=useAppSelector(state=>state.Language)

  const [mode, setMode] = useState(local==='ir'?{value:'ir',label:' ',image:'/Images/iran-flag.png'}:{value:'eng',label:'EN',image:'/Images/united-states-flag.png'})
const dispatcher=useAppDispatch()
  
const FlagOption=()=>{
    return[{value:'ir',label:`IR`,image:'/Images/iran-flag.png'},
    {value:'eng',label:'EN',image:'/Images/united-states-flag.png'}]
}

  useEffect(() => {

    
    if (mode.value === "ir") {
      let head = document.head;

      let link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = `/Theme/RTL.css`;

      head.appendChild(link);
        dispatcher(SetLanguage(mode.value))

  
        return () => {
          head.removeChild(link);
        };
        
    }
    if (mode.value === "eng") {
      let head = document.head;

      let link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = "/Theme/LTR.css";

      head.appendChild(link);
      dispatcher(SetLanguage(mode.value))

      
      return () => {
        head.removeChild(link);
      };
    }

   
  }, [mode.value]);





  
  return (
    <div className="localSwitcher " style={{zIndex:400 }}>
        <MultiSelectComponent Name="" Value={FlagOption().filter((item:any)=>item.value===mode.value).map((item:any)=>item)}  Option={FlagOption()} PlaceHolder="" HandelChange={(e:any)=>{
        
          i18n.changeLanguage(e.value)     
          setMode(e)}}
        />
    </div>
  );
};

export default LocalSwithcerComponent;
