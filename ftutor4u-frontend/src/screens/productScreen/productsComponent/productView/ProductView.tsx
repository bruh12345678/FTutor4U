import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { IProductViewProps } from "./IProductViewProps";
import ProductCard from "../../../../core/components/productCard/ProductCard";

const ProductView: React.FC<IProductViewProps> = ({ products }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 12; // Number of products per page
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    // Get products for current page
    const displayedProducts = products.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="all-products-container">
            {/* Product Grid */}
            <div className="product-grid">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} productCard={product} />
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination-container">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    shape="rounded"
                />
            </div>
        </div>
    );
};

export default ProductView;
