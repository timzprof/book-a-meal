import React, { Component } from 'react';

const withHttpHandler = (WrappedComponent, client) => {
  const { REACT_APP_API_URL: API_URL } = process.env;

  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = client.interceptors.request.use(req => {
        this.setState({ error: null });
        if (req.baseURL === API_URL && !req.headers.Authorization) {
          const token = localStorage.getItem('token');
          if (token) {
            req.headers.Authorization = token;
          }
        }
        return req;
      });
      this.resInterceptor = client.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      client.interceptors.request.eject(this.reqInterceptor);
      client.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withHttpHandler;
