import React from "react"
import "./item.css"

export default class ItemForm extends React.Component {

  constructor(props) {
    super(props)

    let gotAnItem = {
      name: "",
      category: "",
      amount: "",
      unit: "",
      got: "",
      buy: "",
      _id: ""
    }

    if (this.props.item) {
      gotAnItem = this.props.item
    }

    this.state = {
      item: gotAnItem
    }
  }

  handleCheck = event => {
    console.log("The item was checked ", event.target.name)
    const { item } = this.state
    item[event.target.name] = !item[event.target.name]
    const keyToUpdate =  event.target.name
    this.setState(
      { item },
      () => {
        console.log("The item", this.state.item)
        const identity = this.state.item._id
        this.props.itemCheck(identity, keyToUpdate)
        fetch(`http://localhost:8080/items/${identity}`, {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state.item)
        }).then(response => response.json())
      }
    )
  }

  render() {
    return (
      <div className="one-item">
        <div className="item-summary">
          <div className="item-name">
          {this.props.item.name}</div>
          <div className="item-amount">
            <div>{this.props.item.amount} {this.props.item.unit}</div>
          </div>
        </div>

        <div className="item-status">

          <div className="home-container">
            <label className="home-label">
              <input
                className="home-input"
                name="got"
                type="checkbox"
                checked={this.state.item.got}
                onChange={this.handleCheck} />
              <i className="fas fa-home" />
            </label>
          </div>

          <div className="shop-container">
            <label className="shop-label">
              <input
                className="buy-input"
                name="buy"
                type="checkbox"
                checked={this.state.item.buy}
                onChange={this.handleCheck} />
              <i className="fas fa-shopping-cart" />
            </label>
          </div>

        </div>
      </div>
    )
  }
}
