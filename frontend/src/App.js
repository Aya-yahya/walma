//import logo from './logo.svg';

import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
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
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Route path='/search/:keyword?' component={ProductsScreen} />
          <Route path='/' component={HomeScreen} exact />
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
        </Container>
      </main>

      <Footer />
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
