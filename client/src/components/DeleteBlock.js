import axios from 'axios'
import React from 'react'

const DeleteBlock = ({documentId}) => {

  const deleteTicket = async() => {
    const response = await axios.delete(`http://localhost:5000/tickets/${documentId}`)
    const success = response.status == 200
    if(success) window.location.reload()
  }

  return (
    <div className='delete-block'>
      <div className="delete-icon" onClick={deleteTicket}>✖</div>
    </div>
  )
}

export default DeleteBlock