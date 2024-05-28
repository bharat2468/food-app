import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const Food = () => {
    const [productData, setProductData] = useState(null);
    const { id } = useParams();

    async function fetch_data() {
        const API_LINK = "https://fakestoreapi.com/products/" + id;
        const data = await fetch(API_LINK);
        const json_data = await data.json();
        setProductData(json_data);
    }

    useEffect(() => {
        fetch_data();
    }, []);

    if (productData === null) return <Shimmer />;

    const {id:prodId,title,price,description,category,image,rating} = productData;
    const {rate,count} = rating;

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={image}
                    className=" m-10 w-[30%] rounded-lg shadow-2xl"
                />
                <div className="w-[50%]">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <p className="py-6">{description}</p>
                    <div className="badge badge-primary badge-outline">{category}</div>
                    <p className="text-lg my-4">Rs.{price}</p>
                    <button className="btn btn-primary">Buy Now</button>
                    <button className="btn btn-primary mx-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Food;
