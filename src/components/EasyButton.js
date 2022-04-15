import React, { useState } from "react";
import {Button} from 'reactstrap'

function EasyButton({easyMode, setEasyMode, newVerse, setSurahs, longSurahList, shortSurahList}) {
    const [color, setColor] = useState('success')
    const [label, setLabel] = useState("Juz 30")

    const handleToggle = () => {
        const isSwitchingDifficulty = true
        setEasyMode(!easyMode)
        
        if (color === 'success') {
            setColor("danger")
        }else{
            setColor("success")
        }
        if (label === 'Juz 30'){
            setSurahs(longSurahList)
            setLabel("All Surahs")
        }else{
            setSurahs(shortSurahList)
            setLabel("Juz 30")
        }
        newVerse(isSwitchingDifficulty)
        
    }
    
    return (
      <Button color={color} className="EasyButton" onClick={handleToggle}>
        <span className="easyButtonText">{label}</span>
      </Button>
    );
  }

export default EasyButton;