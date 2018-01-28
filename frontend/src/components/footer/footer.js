import React from "react"
import { Link } from "react-router-dom"
import "./footer.css"

class Footer extends React.Component {

  filterItems = event => {
    // console.log("trying to search for", event.target.value)
    this.props.filterItems(event.target.value)
  }

  render() {
    return (
      <div className="footer-container">
        <Link to="/">
          <div className="home-mode"> Home </div>
        </Link>
        <input type="text" className="search-items" placeholder="search" onChange={this.filterItems} />
        <Link to="/shopping-mode">
          <div className="shop-mode"> Shop </div>
        </Link>
      </div>
    )
  }
}
export default Footer
