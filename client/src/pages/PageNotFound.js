import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/layouts/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Go back - page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h1 className="pnf-heading">Oopps ! The page you are looking for doesn't exist.</h1>
        <h4>You may have mistyped the address.</h4>
        <br />
        <Link to="/" className="pnf-btn">Go Back</Link>
        <br />
        <h6> &copy; Copyright 2019. All Rights Reserved.</h6>
      </div>
    </Layout>
  );
};

export default PageNotFound;