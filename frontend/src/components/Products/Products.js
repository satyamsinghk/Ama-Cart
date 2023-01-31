import { useEffect, useState } from "react";
import ListItem from "./ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search).get("search");

  console.log(params);

  useEffect(() => {
    async function fetchItems() {
      try {
        let slug = `products.json`;

        if (params.category) {
          slug = `products-${params.category}.json`;
        }

        if (queryParams) {
          slug += `?search=${queryParams}`;
        }

        const response = await axios.get(
         `https://ama-cart-default-rtdb.firebaseio.com/${slug}`
          
        );

        const data = response.data;

        if (!data) {
          handleNotFound();
          return;
        }

        const transformedData = data.map((products, index) => {
          return {
            ...products,
            quantity: 0,
            id: index,
          };
        });
        setLoader(false);
        setItems(transformedData);
      } catch (error) {
        console.log("Error: ", error);
        setLoader(false);
        alert("Some error occurred");
      } finally {
        setLoader(false);
      }
    }

    fetchItems();

    return () => {
      setItems([]);
      setLoader(true);
    }; // eslint-disable-next-line
  }, [params.category, queryParams]);

  const handleNotFound = () => {
    navigate("/404");
  };

  return (
    <>
      <div className={"product-list"}>
        <div className={"product-list--wrapper"}>
          {items.map((products) => {
            return (
              <ListItem
                // onAdd={handleAddItem}
                // onRemove={handleRemoveItem}
                key={products.id}
                data={products}
              />
            );
          })}
        </div>
      </div>
      {loader && <Loader></Loader>}
    </>
  );
};

export default Products;
