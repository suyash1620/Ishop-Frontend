import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [path, setPath] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    axios
      .get(`http://localhost:7001/get-product/${product_id}`)
      .then((res) => {
        setProduct(res.data.data);
        setPath(res.data.filepath);
      })
      .catch((err) => console.log(err));
  }, [product_id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClearSelection = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Row>
        <Col md={1} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          {product.images && product.images.length > 0 && (
            <>
              {product.images.map((image, index) => (
                <Col
                  key={index}
                  md={4}
                  style={{ border: '1px solid lightgray', width: '100px', margin: '5px' }}
                >
                  <img
                    src={`${path}/${image}`}
                    className={`w-100 clickable-image ${selectedImage === image ? 'selected' : ''}`}
                    alt={`Product ${index + 1}`}
                    height="120px"
                    onMouseOver={() => handleImageClick(image)} // Handle click event
                  />
                </Col>
              ))}
            </>
          )}
        </Col>
        <Col md={6}>
          {selectedImage && (
            <img
              src={`${path}/${selectedImage}`}
              className="w-100"
              alt="Selected"
              height="530px"
            />
          )}
          {!selectedImage && (
            <img
              src={`${path}/${product.thumbnail}`}
              className="w-100"
              alt={product.title}
              height="530px"
            />
          )}
        </Col>
        <Col md={5} style={{textAlign:"left"}}>
          <h3>
            Product Name <br /> {product.title}
          </h3>
          <p>Category: {product.category?.name}</p>
          <p>Brand: {product.brand?.name}</p>
          <h6>Price: {product.price}</h6>
          <p>
            Product Description:
            <br />
            {product.description}
          </p>
          <p>
            Category Description:
            <br />
            {product.category?.description}
          </p>
        </Col>
      </Row>

      {selectedImage && (
        <Row>
          <Col md={12} className="text-center mt-3">
            <Button variant="secondary" onClick={handleClearSelection}>
              Clear 
            </Button>
          </Col>
        </Row>
      )}

      <br /> <br />
    </div>
  );
};

export default Product;
