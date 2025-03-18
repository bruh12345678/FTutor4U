import { IProductCardProps } from "./IProductCardProps";

const ProductCard: React.FC<IProductCardProps> = ({ productCard }) => {
    return (
        <div className="product-card">
            <img
                src={productCard.image}
                alt={productCard.title}
                className="product-image"
            />
            <div className="product-info">
                <h3 className="product-title">{productCard.title}</h3>
                <p className="product-description">{productCard.description}</p>
            </div>
        </div>
    );
};

export default ProductCard;
