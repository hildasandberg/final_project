import React from "react"
import "./header.css"

class Header extends React.Component {

  handleAddClick = () => {
    this.props.showCateForm()
  }

  handleCategoryClick = event => {
    this.props.categoryClick(event.target.name)
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-cate-container">
          {this.props.dbCategories.map(item =>
            <img className="header-category" onClick={this.handleCategoryClick} name={item.name} alt={item.name} src={item.icon} />)
          }
        </div>
        <button className="clear-cate-button" onClick={this.handleCategoryClick} name="" >Show all</button>
        <button className="add-cate-button" onClick={this.handleAddClick}>+</button>
      </div>
    )
  }
}

export default Header
