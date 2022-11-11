import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Announcement from "../Components/Announcement";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import PopularProducts from "../Components/PopularProducts";
import Slider from "../Components/Slider";
import { FindCart } from "../redux/apiCalls";

const Home = () => {
  /*const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    dispatch(FindCart());
    //eslint-disable-next-line
  }, []);*/
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <PopularProducts />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
