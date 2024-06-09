import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import SeachInput from "../components/Form/SeachInput";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";
// import  Price  from "../components/Prices";

const HomePage = () => {
  const Navigate=useNavigate();
  const [cart,setcart]=useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

const Prices = [
  {
    _id: 0,
    name: "₹0 to ₹19",
    array: [0, 19],
  },
  {
    _id: 1,
    name: "₹20 to ₹39",
    array: [20, 39],
  },
  {
    _id: 2,
    name: "₹40 to ₹59",
    array: [40, 59],
  },
  {
    _id: 3,
    name: "₹200 to ₹299",
    array: [200, 299],
  },
  {
    _id: 4,
    name: "₹300 to ₹999",
    array: [300, 999],
  },
  {
    _id: 5,
    name: "₹1000 or more",
    array: [1000, 9999],
  },
];

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    // getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      setTotal(data.count);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

 

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
};

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length===0 || !radio.length===0){
      getAllProducts();
    } 
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length!==0|| radio.length!==0){
      filterProduct();
    }
  }, [checked.length,radio]);

  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* <SeachInput/> */}
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group  onChange={(e) =>setRadio(e.target.value)
            } >
              {Prices?.map((p) => (
                  <Radio  key={p._id} value={p.array}>{p.name}</Radio>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        </div>
        <div className="col-md-9">
        {/* {JSON.stringify(radio,null,4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 mb-2" key={p._id} style={{ width: "18rem", }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    width: "18rem",
                    height:"18rem"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>Navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1"
                  onClick={()=>{
                    setcart([...cart,p]);
                    localStorage.setItem("cart",JSON.stringify([...cart,p]))
                    toast.success("Item added to Cart");
                  }}
                  >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className="m-2 p-3">
            {products?.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </Layout>
  );
};

export default HomePage;