import React from 'react'
import { InfoIcon, WarningIcon } from '../icons/Icons'

function GeneralNote({message, level}) {

const levelData = {
    info :{
        color : "blue",
        icon : <InfoIcon/>
    },
    warning : {
        color : "orange",
        icon : <WarningIcon/>
    }
}

  return (
    <div className={`bg-${levelData[level].color}-400 p-4 rounded-md text-white my-5 flex items-center`}>
   <div className='mr-4'>{levelData[level].icon}</div> <p className="text-md leading-5">{message}</p>
</div>
  )
}

export default GeneralNote