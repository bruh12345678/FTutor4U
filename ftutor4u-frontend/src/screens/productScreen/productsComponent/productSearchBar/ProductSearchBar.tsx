import React from "react";

interface IProductSearchBarProps {
    setSearchProduct: (value: string) => void;
    setCategory: (value: string) => void;
    setPrice: (value: string) => void;
    setRole: (value: string) => void;
}

const ProductSearchBar: React.FC<IProductSearchBarProps> = ({ setSearchProduct, setCategory, setPrice, setRole }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearchProduct(e.target.value)}
            />
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="FIN202">FIN202</option>
                <option value="WDP201">WDP201</option>
                <option value="AIM201">AIM201</option>
                {/* Add more categories as needed */}
            </select>
            <select onChange={(e) => setPrice(e.target.value)}>
                <option value="">All Prices</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="250">250</option>
                {/* Add more price ranges as needed */}
            </select>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="">All Prices</option>
                <option value="tutor">gia sư</option>
                <option value="student">học viên</option>
                {/* Add more price ranges as needed */}
            </select>
        </div>
    );
};

export default ProductSearchBar;