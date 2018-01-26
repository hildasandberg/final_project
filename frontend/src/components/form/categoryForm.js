import React from "react"
import "./form.css"

const categoryIcon = [
  "/images/can.png",
  "/images/carrot.png",
  "/images/chocolate.png",
  "/images/coffee.png",
  "/images/fridge.png",
  "/images/hazelnut.png",
  "/images/milk.png",
  "/images/pepper.png",
  "/images/wheat.png"
]

export default class CategoryForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      // categories: [],
      addNewCategory: {
        name: "",
        icon: ""
      }
    }
  }

  handleInput = event => {
    const { addNewCategory } = this.state
    addNewCategory[event.target.name] = event.target.value
    this.setState({ addNewCategory })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.addNewCategory)
    }).then(response => {
      console.log(response)
      const newbie = this.state.addNewCategory
      console.log("ny kategori", newbie)
      this.props.gotNewCate(newbie)
      // return response.json()
      if (response.ok) {
        this.setState({
          addNewCategory: {
            name: "",
            icon: ""
          }
        })
      }
    })
  }

  render() {
    return (
      <div>
        <button className="close-btn" onClick={this.props.showCateForm}> Close </button>

        <form onSubmit={this.handleSubmit} className={`form-container ${this.props.type}`}>

          <div>
            <input
              type="text"
              name="name"
              placeholder="category name"
              value={this.state.name}
              onChange={this.handleInput} />
          </div>

          <div
            className="inputIcon"
            value={this.state.addNewCategory.icon}
            onChange={this.handleInput}>
            Choose an icon:
            <select className="selectIcon" name="icon">
              {categoryIcon.map(icon =>
                <option value={icon}>{icon}</option>)
              }
            </select>
          </div>

          <div>
            <input className="submit-btn" type="submit" value="Send" />
          </div>
        </form>
      </div>
    )
  }
}
