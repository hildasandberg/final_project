import React from "react"
import "./footer.css"

class Footer extends React.Component {

  filterItems = event => {
    console.log("trying to search for", event.target.value)
    this.props.filterItems(event.target.value)
    // console.log(this.state.toDoItems.includes(event.target.value))
    // this.setState({
    //   filteredList: this.state.toDoItems.filter(todo => todo.includes(event.target.value))
    // })
    // console.log("this is search result", this.state.filteredList)
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
