import React from "react";
import "./BestsellerProduct.css";
import { IBestsellerProductProps } from "./IBestsellerProductProps";

const BestsellerProduct: React.FC<IBestsellerProductProps> = ({bestSellerData}) => {
    return (
        <section className="section">
            <section className="best-seller">
                <h2 className="section-title">Best tutor</h2>
                <p className="section-subtitle">Những gia sư uy tín nhất của chúng tôi</p>
                <div className="best-seller-list">
                    {bestSellerData.map((product) => (
                        <div key={product.id} className="best-seller-card">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3 className="product-title">
                                    {product.title}
                                </h3>
                                <p className="product-description">
                                    {product.description}
                                </p>
                                <button className="view-more">View More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default BestsellerProduct;
