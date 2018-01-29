import React from "react"
import "./header.css"

class Header extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     dbCategories: []
  //   }
  // }
  //
  // ComponentWillRecieveProps(nextProps) {
  //   if (nextProps.dbCategories !== this.state.dbCategories) {
  //     this.setState({
  //       dbCategories: nextProps.dbCategories
  //     })
  //   }
  // }

  handleAddClick = () => {
    this.props.showCateForm()
  }

  handleCategoryClick = event => {
    console.log("index på den klickade komponenten", event.target.dataset.message)
    this.props.categoryClick(event.target.name, event.target.dataset.message)
  }

  render() {
    let categories = []
    if (this.props.fiveCategories) {
      categories = this.props.fiveCategories
    } else {
      categories = this.props.dbCategories
    }

    return (
      <div className="header-container">
        <div className={`app-name ${this.props.backgroundHome ? "header-home-mode" : "header-shop-mode"} `}> Pantri </div>
        <div className="header-cate-container">
          {categories.map((item, index) =>
            <div className="one-cate">
              <div className="one-cate-image">
                <img
                key={item._id}
                onClick={this.handleCategoryClick}
                name={item.name}
                alt={item.name}
                src={item.icon}
                data-message={index} />
              </div>
              <p>{item.name}</p>
            </div>)
          }
        </div>
        <div className="header-button-container">
          <button className="clear-cate-button" onClick={this.handleCategoryClick} name="" >Show all</button>
          <button className="add-cate-button" onClick={this.handleAddClick}> Add category </button>
        </div>
      </div>
    )
  }
}

export default Header
