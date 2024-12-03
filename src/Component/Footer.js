import React from 'react'

function Footer() {

    const mystyle={
        marginTop:'550px',
        border:'2px solid black',
        height:'40px',
        width:'100%',
        color:'red',
        borderRadius:'20px',
        fontSize:'20px',
        FontWeight:'10px',
        backgroundColor:'black',
        textDecoration:'none',
        textAlign:'center',
    }

  return (
    <div>
      <footer style={mystyle}>
        <span>All Right Reserved 2024 &copy; RamanSoftCompany</span>
      </footer>
    </div>
  )
}

export default Footer
