import React from "react";
import "./home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://wallpaperaccess.com/full/645411.jpg"
        />
        <div className="home_row">
          <Product
            id="1234567"
            title="Cyberpunk 2077"
            price={20.23}
            image={"https://i.redd.it/citis0476wi41.jpg"}
            rating={5}
          />
          <Product
            id="7654321"
            title="God of War"
            price={18.98}
            image={
              "https://m.media-amazon.com/images/M/MV5BMmVjMzkyYWMtNDNhNi00ZWI3LTgxNGUtODRkMWYxNjZmNDI5XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg"
            }
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            id="1324567"
            title="Marvel's Spidet-Man"
            price={22.54}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/81d6JU6g1pL._SX385_.jpg"
            }
            rating={5}
          />
          <Product
            id="1243567"
            title="Control"
            price={16.98}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/71zlKxJ8OiL._SX425_.jpg"
            }
            rating={4}
          />
          <Product
            id="1234657"
            title="Devil May Cry 5"
            price={23.76}
            image={
              "https://s3.us-east-2.amazonaws.com/cc-prd-s3-uploads/2019/3/12/c92dd7dbfeaaa57f73f5a3c27500d90c5222c2e5.jpeg"
            }
            rating={3}
          />
        </div>
        <div className="home_row">
          <Product
            id="1234576"
            title="Sony PS5"
            price={35.4}
            image={"https://i.ytimg.com/vi/AvG6DPLl2UE/maxresdefault.jpg"}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
