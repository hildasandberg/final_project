import React from "react"
import Item from "components/item/item.js"
import "./itemList.css"

class ItemList extends React.Component {

  handleAddClick = () => {
    console.log("tryckte på plusset")
    this.props.showItemForm()
  }

  render() {
    let itemsToRender = this.props.listItems

    if (this.props.filterVariable) {
      console.log(this.props.filterVariable)
      itemsToRender = itemsToRender.filter(item =>
        item.category === this.props.filterVariable)
    }

    return (
      <div className="item-in-list">
        {itemsToRender.map(item =>
          <Item item={item} />)}
        <button className="add-item-button" onClick={this.handleAddClick}>+</button>
      </div>
    )
  }
}

export default ItemList
