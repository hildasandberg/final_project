import React from "react"
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
      items: [],
      itemFormActive: false,
      cateFormActive: false,
      filterVariable: "",
      searchTerm: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/items").then(response => {
      return response.json()
    }).then(json => {
      this.setState({ items: json })
    })
    fetch("http://localhost:8080/categories").then(response => {
      return response.json()
    }).then(json => {
      this.setState({ categories: json })
    })
  }

  showItemForm = () => {
    this.setState({
      itemFormActive: !this.state.itemFormActive
    })
  }

  showCateForm = () => {
    this.setState({
      cateFormActive: !this.state.cateFormActive
    })
  }

  addNewItem = itemObject => {
    console.log("new item to add to app state", itemObject)
    this.setState({
      items: [...this.state.items, itemObject]
    })
  }

  addNewCate = itemObject => {
    console.log("new category to add to app state", itemObject)
    this.setState({
      categories: [...this.state.categories, itemObject]
    })
  }

  itemCheck = (itemIdentity, keyToUpdate) => {
    console.log("tjena", itemIdentity, keyToUpdate)
    const foundItem = this.state.items.find(item => item._id === itemIdentity)
    console.log(foundItem[keyToUpdate])
  }

  categoryClick = cate => {
    this.setState({
      filterVariable: cate
    })
  }

  filterItems = search => {
    this.setState({
      searchTerm: search
    })
  }

  render() {
    return (
      <div>
        <Header
          dbCategories={this.state.categories}
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

        <ItemList
          listItems={this.state.items}
          showItemForm={this.showItemForm}
          filterVariable={this.state.filterVariable}
          searchTerm={this.state.searchTerm}
          checkItem={this.itemCheck} />

        <Footer
          filterItems={this.filterItems} />
      </div>
    )
  }

}

export default App
