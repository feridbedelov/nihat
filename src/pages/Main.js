import React, { Component } from "react";
import { Category } from "../components/Category";
import { client } from "../apolloClient";
import { CategoryDocument } from "../api/getCategory";
import { withRouter } from "react-router-dom";
import loadingGif from "../loading.gif";
import classes from "./Main.module.css";

class Main extends Component {
  state = {
    loading: false,
    error: false,
    products: [],
    name: "",
  };

  async fetchCategory(categoryValue) {
    try {
      this.setState({
        loading: true,
        error: false,
      });
      const result = await client.query({
        query: CategoryDocument,
        variables: {
          input: {
            title: categoryValue,
          },
        },
      });
      this.setState({
        name: result.data?.category?.name,
      });
      const products = result.data?.category?.products;
      if (products?.length) {
        this.setState({
          products,
        });
      }
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 400);
    }
  }

  componentDidMount() {
    let categoryValue = "all";
    if (this.props.location.search) {
      categoryValue = this.props.location.search.split("=")[1];
    }
    this.fetchCategory(categoryValue);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      let categoryValue = "all";
      if (this.props.location.search) {
        categoryValue = this.props.location.search.split("=")[1];
      }
      this.fetchCategory(categoryValue);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <h1 className={classes.error}>
          <img src={loadingGif} alt="loading" />
        </h1>
      );
    }
    if (this.state.error) {
      return <h1>Error!</h1>;
    }
    return (
      <Category
        name={this.state.name}
        products={this.state.products}
        selectedCurrency={this.props.selectedCurrency}
        editItem={this.props.editItem}
      />
    );
  }
}

export const MainWithRouter = withRouter(Main);
