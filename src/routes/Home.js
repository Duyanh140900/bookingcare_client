import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    console.log("componentDidMount", isLoggedIn);
  }
  render() {
    const { isLoggedIn } = this.props;
    console.log("isLoggedIn", isLoggedIn);
    let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
