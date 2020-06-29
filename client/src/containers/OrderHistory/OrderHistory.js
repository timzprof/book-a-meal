import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OrderTable from '../../components/Table/OrderTable/OrderTable';

class OrderHistory extends Component {
  state = {
    orders: [
      {
        id: 1,
        user: 'John Doe',
        meals: [
          {
            id: 1,
            name: 'Jollof Rice',
            quantity: 1
          },
          {
            id: 2,
            name: 'Bread & Beans',
            quantity: 2
          }
        ],
        date: '24th Feb 2019',
        price: 1500
      },
      {
        id: 2,
        user: 'James Smith',
        meals: [
          {
            id: 1,
            name: 'Jollof Rice',
            quantity: 1
          },
          {
            id: 2,
            name: 'Bread & Beans',
            quantity: 1
          }
        ],
        date: '28th Feb 2019',
        price: 1000
      }
    ]
  };
  render() {
    return (
      <React.Fragment>
        <Header bannerText="Your Order History" authenticated />
        <main>
          <OrderTable orders={this.state.orders} />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default OrderHistory;
