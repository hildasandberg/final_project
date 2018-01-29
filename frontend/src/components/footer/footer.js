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
          <button className="home-mode" onClick={this.props.toggleAppBackground}> Home </button>
        </Link>
        <input type="text" className="search-items" placeholder="Search..." onChange={this.filterItems} />
        <Link to="/shopping-mode">
          <button className="shop-mode" onClick={this.props.toggleAppBackground}> Shop </button>
        </Link>
      </div>
    )
  }
}
export default Footer
