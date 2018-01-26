import React from "react"
import Item from "components/item/item.js"
import "./itemList.css"

class ItemList extends React.Component {

  handleAddClick = () => {
    this.props.showItemForm()
  }

  checkItem = (identity, keyToUpdate) => {
    this.props.checkItem(identity, keyToUpdate)
  }

  render() {
    let itemsToRender = this.props.listItems

    if (this.props.filterVariable) {
      itemsToRender = itemsToRender.filter(item =>
        item.category === this.props.filterVariable)
    }

    if (this.props.searchTerm) {
      const searchFor = this.props.searchTerm.toUpperCase()
      itemsToRender = itemsToRender.filter(item =>
        item.name.toUpperCase().includes(searchFor))
    }

    return (
      <div className="item-in-list">
        {itemsToRender.map(item =>
          <Item
            item={item}
            itemCheck={this.checkItem} />)}
        <button className="add-item-button" onClick={this.handleAddClick}>+</button>
      </div>
    )
  }
}

export default ItemList
