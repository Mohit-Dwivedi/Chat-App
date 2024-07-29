import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({userId, name,ImageUrl,width,height}) => {

    const onlineUser = useSelector(state => state?.user?.onlineUser)

    //amit prajapati
    let avatarName = ''

    if(name){
        const splitName = name?.split("")
        if(splitName.length > 1){
            avatarName = splitName[0][0]+splitName[1][0]
        }
        else{
            avatarName = splitName[0][0]
        }
    }
    const bgColor = [
        'bg-slat-200',
        'bg_teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200'
    ]
    const randomNumber = Math.floor(Math.random() * 50)

    const isOnline = onlineUser.includes(userId)

  return (
    <div className= {`text-slat-800 rounded-full font-bold relative`} style={{width: width+"px",height:height+"px"}}>
      {
        ImageUrl ? (
            <img src={ImageUrl} width={width} height={height} alt={name} className='overflow-hidden rounded-full'/>
        ) : (
            name ? (
                <div className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`} style={{width: width+"px",height:height+"px"}}>
                 {avatarName}
                </div>
            ) : (
                <div>
                    <PiUserCircle size={width}/>
                </div>
            )
        )
      }
      {
        isOnline && (
            <div className='bg-green-600 p-1 absolute -right-1 bottom-2 z-10 rounded-full'></div>
        )
      }
    </div>
  )
}

export default Avatar
