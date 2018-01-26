import React from "react"
import "./footer.css"

class Footer extends React.Component {

  filterItems = event => {
    // console.log("trying to search for", event.target.value)
    this.props.filterItems(event.target.value)
  }

  render() {
    return (
      <div className="footer-container">
        <div className="home-mode"> Home </div>
        <input type="text" className="search-items" placeholder="search" onChange={this.filterItems} />
        <div className="shop-mode"> Shop </div>
      </div>
    )
  }
}
export default Footer
