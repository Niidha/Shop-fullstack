import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { CartProvider } from './pages/CartProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './Redux/store.jsx'

createRoot(document.getElementById('root')).render(
<CartProvider>
  <Provider store={store}>
  <App />
  <Toaster position='top-right'/>
  </Provider>
  </CartProvider>
)
