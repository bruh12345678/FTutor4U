import React from "react";
import "./RecommendedProduct.css";
import { IRecommendedProductProps } from "./IRecommendedProductProps";
import ProductCard from "../../../../core/components/productCard/ProductCard";

const RecommendedProduct: React.FC<IRecommendedProductProps> = ({recommendedProducts}) => {
    return (
        <section className="recommended-section">
            <h2 className="section-title">Gợi ý Hôm nay</h2>
            <p className="section-subtitle">Có thể phù hợp với bạn</p>
            <div className="product-grid">
                {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} productCard={product} />
                ))}
            </div>
        </section>
    );
};

export default RecommendedProduct;
