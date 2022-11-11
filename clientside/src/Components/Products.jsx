import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;
const Container2 = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Products = ({ cat, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (cat) {
          await axios
            .get(`/api/products?category=${cat}`)
            .then((res) => {
              setProducts(res.data);
              console.log(res.data);
            })
            .catch((error) => console.log(error));
        } else {
          const res = await axios
            .get(`/api/products`)
            .then((res) => {
              setProducts(res.data);
              console.log(res.data);
            })
            .catch((error) => console.log(error));
        }
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  const eightProducts = products.slice(0, 8);

  return (
    <Container2>
      <Title>All Products</Title>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : eightProducts.map((item) => <Product item={item} key={item._id} />)}
      </Container>
    </Container2>
  );
};

export default Products;
