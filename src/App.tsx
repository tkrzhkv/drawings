import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart"
import PaintingInfo from "./pages/PaintingInfo";
import './scss/app.scss'
import MainLayout from "./layouts/MainLayout";


function App()  {
        return (
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="paintingInfo/:id" element={<PaintingInfo/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        )
}

export default App;
