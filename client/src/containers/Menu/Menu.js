import React from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';
import Modal from '../../components/UI/Modal/Modal';
import useGlobal from '../../store';

const menu = props => {
  const [globalState, globalActions] = useGlobal();
  return (
    <Aux>
      <Header bannerText="Today's Menus" authenticated={globalState.userAuthenticated} overlay={globalState.beingOrdered} />
      <main>
        <CatererMenus catererData={globalState.menu} handleQuantity={globalActions.menu.handleQuantity} />
      </main>
      <Modal
        meal={globalState.beingOrdered}
        type="quantity"
        show={globalState.beingOrdered !== null}
        close={globalActions.menu.hideQuantityModal}
      />
      <Footer />
    </Aux>
  );
};

export default menu;
