import React from 'react'

const PostCard = ({data}) => {

  return (
    <div className='post-card'>
      <p>Name : {data.Name}</p>
      <p>Branch Type : {data.BranchType}</p>
      <p>Delivery Status : {data.DeliveryStatus}</p>
      <p>District : {data.District}</p>
      <p>Division : {data.Division}</p>
    </div>
  )
}

export default PostCard