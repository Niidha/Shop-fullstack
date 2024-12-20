import { BrowserRouter, Route, Routes } from "react-router"

import Signup from "../pages/Signup"
import Login from "../Pages/Login"
import { ProtectedRoute } from "./Protected"
import ShopPage from "../pages/Shop"
import CartPage from "../pages/Cart"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="" element={
                    <ProtectedRoute>
                      <ShopPage/>
                    </ProtectedRoute>
                    } />
                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <CartPage/>
                        </ProtectedRoute>
                    }/>
                <Route path="signup" element={
                    <ProtectedRoute auth={true}>
                       <Signup/>
                    </ProtectedRoute>
                } />
                <Route path="login" element={<ProtectedRoute auth={true}>
                       <Login/>
                </ProtectedRoute>} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router