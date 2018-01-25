import React from "react"
import Item from "components/item/item.js"
import "./itemList.css"

class ItemList extends React.Component {

  handleAddClick = () => {
    this.props.showItemForm()
  }

  // filterItems = event => {
  //   console.log("trying to search for", event.target.value)
  //   console.log(this.state.toDoItems.includes(event.target.value))
  //   this.setState({
  //     filteredList: this.state.toDoItems.filter(todo => todo.includes(event.target.value))
  //   })
  //   console.log("this is search result", this.state.filteredList)
  // }

  render() {
    let itemsToRender = this.props.listItems

    if (this.props.filterVariable) {
      itemsToRender = itemsToRender.filter(item =>
        item.category === this.props.filterVariable)
    }

    if (this.props.searchTerm) {
      console.log("är i itemList och söker på", this.props.searchTerm)
      itemsToRender = itemsToRender.filter(item =>
        item.name.includes(this.props.searchTerm))
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
