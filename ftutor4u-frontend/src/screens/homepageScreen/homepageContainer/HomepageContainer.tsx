import * as React from "react";
import {
    BestTutorsDataMock,
    BestRecommendTutorsDataMock,
    ITutor,
} from "../homepageConst/HomepageConst";
import BestsellerProduct from "../homepageComponent/bestsellerProduct/BestsellerProduct";
import RecommendedProduct from "../homepageComponent/recommendedProduct/RecommendedProduct";
import Header from "../../../core/components/header/navBar";

// import woodenPlankOrBoard from "../../assets/images/wooden-plank-or-board.jpg";

const HomepageContainer: React.FC = () => {
    const [bestTutordata, setbestTutordata] = React.useState<ITutor[]>([]);
    const [bestRecommendTutordata, setRecommendTutorsData] = React.useState<ITutor[]>([]);

    const fetchData = async () => {
        const bestTutordata = BestTutorsDataMock;
        setbestTutordata(bestTutordata);
        const bestRecommendTutordata = BestRecommendTutorsDataMock;
        setRecommendTutorsData(bestRecommendTutordata);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            {/* <Sidebar /> */}
            <div className="content">
                <Header/>
                <div className="main">
                    {/* <img src={woodenPlankOrBoard} alt="Wooden Plank or Board" className="title" />
                    <img src={anotherImage} alt="Another Image" className="subtitle" /> */}

                    {/* Best Seller Section */}
                    <BestsellerProduct bestSellerData={bestTutordata} />
                    {/* Recommended Section */}
                    <RecommendedProduct recommendedProducts={bestRecommendTutordata} />
                </div>
            </div>
        </div>
    );
};

export default HomepageContainer;