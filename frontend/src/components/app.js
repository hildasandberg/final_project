import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import ItemForm from "components/form/itemForm.js"
import CategoryForm from "components/form/categoryForm.js"
import ItemList from "components/itemList/itemList.js"
import Footer from "components/footer/footer"
import Header from "components/header/header"

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      categoriesLength: 0,
      sliceStart: 0,
      sliceEnd: 5,
      items: [],
      itemFormActive: false,
      cateFormActive: false,
      filterVariable: "",
      searchTerm: ""
    }
  }

  // Fetches items and categories from the server
  componentDidMount() {
    fetch("http://localhost:8080/items").then(response => {
      return response.json()
    }).then(json => {
      this.setState({ items: json })
    })
    fetch("http://localhost:8080/categories").then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        categories: json,
        categoriesLength: json.length
      })
    })
  }

  // Toggles visibility of the form for adding items
  showItemForm = () => {
    this.setState({
      itemFormActive: !this.state.itemFormActive
    })
  }

  // Toggles visibility of the form for adding categories
  showCateForm = () => {
    this.setState({
      cateFormActive: !this.state.cateFormActive
    })
  }

  // Add new item to state
  addNewItem = itemObject => {
    // console.log("new item to add to app state", itemObject)
    this.setState({
      items: [...this.state.items, itemObject]
    })
  }

  // Add new category to state
  addNewCate = itemObject => {
    console.log("new category to add to app state", itemObject)
    this.setState({
      categories: [...this.state.categories, itemObject]
    })
  }

  // Don't know if this makes sense or not... Seems to be working...
  itemCheck = (itemIdentity, keyToUpdate) => {
    // console.log("tjena", itemIdentity, keyToUpdate)
    const foundItem = this.state.items.find(item => item._id === itemIdentity)
    const foundItemIndex = this.state.items.findIndex(item => item._id === itemIdentity)
    // console.log("denna blev checkad", foundItem, foundItem[keyToUpdate])
    // console.log("den har index", foundItemIndex)
    const itemsCopy = this.state.items
    itemsCopy[foundItemIndex[keyToUpdate]] = foundItem[keyToUpdate]
    this.setState({
      items: itemsCopy
    }, () => {
      console.log(this.state.items)
    })
  }

  // Den här funktionen behöver uppdateras
  categoryClick = (cate, cateIndex) => {
    this.setState({
      filterVariable: cate
    })
    if (cateIndex > 2) {
      this.setState({
        filterVariable: cate,
        sliceStart: this.state.sliceStart + 1
      })
    } else if (cateIndex < 2) {
      if (this.state.sliceStart === 0) {
        this.setState({
          sliceStart: this.state.categoriesLength
        })
      }
      this.setState({
        filterVariable: cate,
        sliceStart: this.state.sliceStart - 1
      })
    }
  }

  // Callback function from filter input in Footer to be passed into ItemList
  filterItems = search => {
    this.setState({
      searchTerm: search
    })
  }

  render() {
    let fiveCategories = []
    if (this.state.categoriesLength) {
      if (this.state.categoriesLength >= 5) {
        fiveCategories = this.state.categories.slice(
          this.state.sliceStart,
          this.state.sliceStart + this.state.sliceEnd
        )
        console.log("fem kategorier", fiveCategories)
      }
    }
    return (
      <BrowserRouter>
        <div className="app-container">
          <Header
            dbCategories={this.state.categories}
            fiveCategories={fiveCategories}
            showCateForm={this.showCateForm}
            categoryClick={this.categoryClick} />

          <div className={this.state.cateFormActive ? "active" : "inactive"}>
            <CategoryForm
              gotNewCate={this.addNewCate}
              showCateForm={this.showCateForm} />
          </div>

          <div className={this.state.itemFormActive ? "active" : "inactive"}>
            <ItemForm
              dbCategories={this.state.categories}
              gotNewItem={this.addNewItem}
              showItemForm={this.showItemForm} />
          </div>

          <Route
            exact
            path="/"
            render={routeProps =>
              <ItemList
                {...routeProps}
                mode="home-mode"
                listItems={this.state.items}
                showItemForm={this.showItemForm}
                filterVariable={this.state.filterVariable}
                searchTerm={this.state.searchTerm}
                checkItem={this.itemCheck} />
            } />

          <Route
            exact
            path="/shopping-mode"
            render={routeProps =>
              <ItemList
                {...routeProps}
                mode="shopping-mode"
                listItems={this.state.items}
                showItemForm={this.showItemForm}
                filterVariable={this.state.filterVariable}
                searchTerm={this.state.searchTerm}
                checkItem={this.itemCheck} />
            } />

          <Footer
            filterItems={this.filterItems} />
        </div>
      </BrowserRouter>
    )
  }

}

export default App
