import React, { useEffect, useState } from "react";
import { IconSettings, ArrowRightIcon, ArrowLeftIcon } from "../icons";
import SearchBar from './SearchBar';
import ButtonMenu from './ButtonMenu';
import { useNavigate } from "react-router-dom";

enum iconColor {
  white = "white",
  black = "black",
}

function SettingsBar() {
  const currentIconColor = iconColor.white;
  const navigate = useNavigate()
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(true);
  const [counterR, setCounterR] = useState(0)
  const [counterL, setCounterL] = useState(0)

  const goBack = () => {
    navigate(-1)
    setCounterL(counterL - 2)
    setCounterR(counterR + 1)
  }
  const goForward = () => {
    navigate(1)
    setCounterR(counterR - 1)
  }

  useEffect(() => {
    setCounterL(counterL + 1)
  }, [window.location.href])

  useEffect(() => {

    if(counterL > 1) {
      setDisableLeft(false)
    } else if(counterL <= 1) {
      setDisableLeft(true)
    } 
    
    if(counterR > 0) {
      setDisableRight(false)
    } else if(counterR <= 0) {
      setDisableRight(true)
    }

  }, [counterL, counterR])

  return (
    <div className="settings-bar">
      <div className='settings-bar__block-left'>
        <div className="settings-bar__arrows">
          <button className='arrow btn-reset' disabled={disableLeft} onClick={() => goBack()}><ArrowLeftIcon className='arrow--left'/></button>
          <button className='arrow btn-reset' disabled={disableRight} onClick={() => goForward()}><ArrowRightIcon className='arrow--right'/></button>
        </div>
      </div>
      <ButtonMenu/>
    </div>
  );
}

export default SettingsBar;
