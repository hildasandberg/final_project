import React from "react"
import "./footer.css"

class Footer extends React.Component {

  render() {
    return (
      <div className="footer-container">
        <div className="home-mode"> Home </div>
        <input type="text" className="search-items" placeholder="search"/>
        <div className="shop-mode"> Shop </div>
      </div>
    )
  }
}
export default Footer
