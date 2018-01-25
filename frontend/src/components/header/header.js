import React from "react"
import "./header.css"

class Header extends React.Component {

  handleAddClick = () => {
    console.log("tryckte på plusset")
    this.props.showCateForm()
  }

  handleCategoryClick = event => {
    console.log("you clicked a category", event.target.value)
    this.props.categoryClick(event.target.value)
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-cate-container">
          {this.props.dbCategories.map(item =>
            <button className="header-category" onClick={this.handleCategoryClick} value={item.name} >{item.name}</button>)
          }
        </div>
        <button className="add-cate-button" onClick={this.handleAddClick}>+</button>
      </div>
    )
  }
}

export default Header
