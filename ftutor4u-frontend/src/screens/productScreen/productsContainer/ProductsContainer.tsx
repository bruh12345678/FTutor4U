import React, { useState, useEffect } from "react";
import { BestTutorsDataMock, ITutor } from "../../homepageScreen/homepageConst/HomepageConst";
import ProductSearchBar from "../productsComponent/productSearchBar/ProductSearchBar";
import ProductView from "../productsComponent/productView/ProductView";
import Header from "../../../core/components/header/navBar";

const ProductsContainer: React.FC = () => {
    const [productsData, setProductsData] = useState<ITutor[]>([]);
    const [searchProduct, setSearchProduct] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [role, setRole] = useState<string>("");

    const fetchData = async () => {
        const mockData = BestTutorsDataMock;
        setProductsData(mockData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredProducts = productsData.filter(product => {
        return (
            product.title.toLowerCase().includes(searchProduct.toLowerCase()) &&
            (subject ? product.subject === subject : true) &&
            (role ? product.role === role : true) &&
            (price ? product.price === price : true)
        );
    });

    return (
        <><Header />
        <div className="all-products-container">
            <h2>Tìm kiếm người dạy - học viên</h2>

            {/* Search & Filters */}
            <div className="filter-container">
                <ProductSearchBar
                    setSearchProduct={setSearchProduct}
                    setCategory={setSubject}
                    setPrice={setPrice}
                    setRole={setRole}
                />
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                <ProductView products={filteredProducts} />
            </div>
        </div>
        </>
    );
};

export default ProductsContainer;