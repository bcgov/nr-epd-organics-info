import React from 'react'
import { useLocation } from 'react-router-dom'

export default function AuthorizationDetails() {
  const location = useLocation();
  const data = location?.state?.data;
  console.log(data);

  return (
    <div>
      <h1>Authorization Details</h1>
      <p>Authorization Number: {data['authorizationNumber']}</p>
    </div>
  )
}
