import React from 'react'

const SuccessOrder = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#4CAF50',
  };

  return (
    <div style={containerStyle}>
        <img 
          src='https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png' 
          alt='Success' 
          style={imageStyle}
        />
        <h1 style={headingStyle}>Order Successful</h1>
    </div>
  )
}

export default SuccessOrder
