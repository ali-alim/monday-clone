import React from 'react'



const StatusDisplay = ({status}) => {

  const getColor = (status) => {
    let color;
    switch (status){
      case 'done':
        color = 'rgb(39, 200, 60)';
        break;
      case 'working on it':
        color = 'rgb(237, 200, 39)'
        break;
      case 'stuck':
        color = 'rgb(245, 100, 135)'
        break;
        default:
          color = '(188, 215, 226)'  
    }
    return color;

  }

  return (
    <div className='status-display' style={{backgroundColor:getColor(status)}}>
      {status}
    </div>
  )
}

export default StatusDisplay
