import { Dispatch, SetStateAction } from "react";

export interface IProductSearchBarProps {
    setSearchProduct: Dispatch<SetStateAction<string>>;
    setCategory: Dispatch<SetStateAction<string>>;
    setPrice: Dispatch<SetStateAction<string>>;
}
