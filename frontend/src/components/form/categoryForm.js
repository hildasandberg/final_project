import React from "react"
import "./form.css"

const categoryIcon = ["https://image.flaticon.com/icons/svg/135/135620.svg", "http://clubpenguin.wikia.com/wiki/File:Fridge_icon.png", "https://d30y9cdsu7xlg0.cloudfront.net/png/76181-200.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPfD_RTrGMJjNxWe85aOYzPciy6IlmZ5lSuALZwEaTZikM5Qx8w", "https://cdn.xl.thumbs.canstockphoto.se/produkt-isometric-stil-mejeri-ikon-vektor-clip-art_csp50027313.jpg"]

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
