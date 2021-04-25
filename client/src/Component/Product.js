import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read } from "./api";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row p-4">
        <div className="smallS col-lg-6">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
