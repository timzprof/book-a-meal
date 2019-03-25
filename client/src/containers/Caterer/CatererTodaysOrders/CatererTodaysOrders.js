import React, { Component } from 'react';
import Aux from '../../../hoc/auxiliary';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import OrderTable from '../../../components/Table/OrderTable/OrderTable';

class CatererTodaysOrders extends Component {
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
        price: 1000
      }
    ]
  };
  render() {
    return (
      <Aux>
        <Header bannerText="Todays Order Summary" authenticated caterer />
        <main>
          <OrderTable orders={this.state.orders} caterer todaysOrders />
        </main>
        <Footer />
      </Aux>
    );
  }
}

export default CatererTodaysOrders;
