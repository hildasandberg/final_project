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
    this.setState(
      { item },
      () => {
        console.log("The item", this.state.item)
        const identity = this.state.item._id
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
          <div>Got at home?
          <input
            name="got"
            className="check"
            type="checkbox"
            checked={this.state.item.got}
            onChange={this.handleCheck} />
          </div>
          <div>Need to buy?
          <input
            name="buy"
            className="check"
            type="checkbox"
            checked={this.state.item.buy}
            onChange={this.handleCheck} />
          </div>
        </div>
      </div>
    )
  }
}
