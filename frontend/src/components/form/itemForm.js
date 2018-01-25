import React from "react"
import "./form.css"

const units = ["pcs", "g", "hg", "kg", "l", "dl", "ml", "bag", "bottle"]

export default class ItemForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      // categories: cate,
      addNewItem: {
        name: "",
        category: "",
        amount: 0,
        unit: "",
        got: false,
        buy: false
      }
    }
  }

  componentWillReceiveProps() {
    if (this.props.dbCategories) {
      console.log(this.props.dbCategories)
      const cate = this.props.dbCategories[0]
      const { addNewItem } = this.state
      addNewItem.category = cate
      this.setState({ addNewItem })
    }
  }

  handleInput = event => {
    const { addNewItem } = this.state
    addNewItem[event.target.name] = event.target.value
    this.setState({ addNewItem })
  }

  handleCheck = event => {
    console.log("The item was checked ", event.target.name)
    const { addNewItem } = this.state
    addNewItem[event.target.name] = !addNewItem[event.target.name]
    this.setState({ addNewItem })
    // , () => {
    //   this.props.checkItem(this.props.id, this.state.done)
    // }
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.addNewItem)
    }).then(response => {
      console.log(response)
      const newbie = this.state.addNewItem
      this.props.gotNewItem(newbie)
      // return response.json()
      if (response.ok) {
        this.setState({
          addNewItem: {
            name: "",
            category: "",
            amount: "",
            unit: "",
            got: "",
            buy: ""
          }
        })
      }
    })
  }

  render() {
    return (
      <div>
        <button className="close-btn" onClick={this.props.showItemForm}> Close </button>

        <form onSubmit={this.handleSubmit} className={`form-container ${this.props.type}`}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Add you item here"
              value={this.state.name}
              onChange={this.handleInput} />
          </div>

          <div
            className="inputCategory"
            value={this.state.addNewItem.category}
            onChange={this.handleInput}>
            Category:
            <select className="selectCategory" name="category">
              {this.props.dbCategories.map(item =>
                <option value={item.name}>{item.name}</option>)
              }
            </select>
          </div>

          <input
            type="text"
            name="amount"
            placeholder="How much"
            value={this.state.amount}
            onChange={this.handleInput} />

          <div
            className="inputUnit"
            value={this.state.unit}>
            Unit:
            <select className="selectUnit" name="unit" onChange={this.handleInput}>
              {units.map(item =>
                <option value={item}>{item}</option>)}
            </select>
          </div>

          Got this at home?
          <input
            className="gotAtHome"
            name="got"
            type="checkbox"
            checked={this.state.got}
            onChange={this.handleCheck} />

          Need to buy?
          <input
            className="toBuy"
            name="buy"
            type="checkbox"
            checked={this.state.buy}
            onChange={this.handleCheck} />

          <div>
            <input className="submit-btn" type="submit" value="Send" />
          </div>
        </form>
      </div>
    )
  }
}
