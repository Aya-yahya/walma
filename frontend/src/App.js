//import logo from './logo.svg';

import { Container } from 'react-bootstrap'
import Header2 from './components/Header2'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import HomeScreen from './screens/HomeScreen'
import GuestCheckoutScreen from './screens/GuestCheckoutScreen'
import productScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import OrderScreen from './screens/OrderScreen'
import LoginScreen from './screens/LoginScreen'
import ShippingScreen from './screens/ShippingScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import OrderListScreen from './screens/OrderListScreen'
import PromocpdeListScreen from './screens/PromocodeListScreen'
import UserListScreen from './screens/UserListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ProductsScreen from './screens/ProductsScreen'
import { useTranslation } from 'react-i18next'
/*
import logo from './logo.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import WishListScreen from './screens/WishListScreen'
import BrandsListScreen from './screens/BrandsListScreen'
*/

function App() {
  const { t, i18n } = useTranslation()
  i18n.language === 'ar'
    ? (document.documentElement.dir = 'rtl')
    : (document.documentElement.dir = 'ltr')

  return (
    <Router>
      <div id='outer-container'>
        <Header2 style={{ position: 'fixed' }} />
        <main>
          <Route path='/' component={HomeScreen} exact />
          <Route
            path='/redirect'
            component={() => {
              window.location.href =
                'https://kpaytest.com.kw/kpg/paymentpage.htm?PaymentID=100202108054732701#d'
            }}
          />
          <Route path='/search/:keyword?' component={ProductsScreen} />
          <Route path='/product/:id' component={productScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/guestcheckout' component={GuestCheckoutScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/product/create' component={ProductCreateScreen} />

          <Route path='/admin/promocodes' component={PromocpdeListScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
/*
s<Route path='/wishlist' component={WishListScreen} />
<Route path='/brands/:id' component={ProductsScreen} />
<Route path='/categorys/:keyword' component={ProductsScreen} />
<Route path='/payment' component={PaymentScreen} />
<Route path='/placeorder' component={PlaceOrderScreen} />
<Route
path='/admin/brandslist'
component={BrandsListScreen}
exact
/>

*/
