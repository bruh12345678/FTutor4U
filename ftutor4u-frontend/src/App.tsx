import { Route, Routes } from "react-router-dom";
import LoginScreenContainer from "./screens/loginScreen/loginContainer/LoginScreenContainer";
import SignupScreenContainer from "./screens/signupScreen/signupContainer/SignupScreenContainer";
import HomepageContainer from "./screens/homepageScreen/homepageContainer/HomepageContainer";
import ProductsContainer from "./screens/productScreen/productsContainer/ProductsContainer";
import NewsScreenContainer from "./screens/newsScreen/newsContainer/newsContainer";
import ProfileScreenContainer from "./screens/ProfileScreen/ProfileScreenContainer/ProfileScreenContainer";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginScreenContainer />} />
            <Route path="/login" element={<LoginScreenContainer />} />
            <Route path="/signup" element={<SignupScreenContainer />} />
            <Route path="/homepage" element={<HomepageContainer />} />
            <Route path="/search" element={<ProductsContainer />} />
            <Route path="/news" element={<NewsScreenContainer />} /> 
            <Route path="/profile" element={<ProfileScreenContainer />} />
        </Routes>
    );
};

export default App;
