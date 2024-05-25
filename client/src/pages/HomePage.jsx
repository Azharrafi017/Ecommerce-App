import React from "react";
import Layout from "./../components/Layout/Layout";
import {useContext} from "react";
import { AuthContext } from "../context/auth";
const HomePage = () => {
  const [auth,setauth]=useContext(AuthContext);
  // console.log(auth);
  return (
    <Layout title={"Best offers "}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
};

export default HomePage;