import React, { useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {
    const {id} = useParams()
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getProductsThunk())
    },[])

    const productslist= useSelector(state=> state.products)

    const findproduct= productslist.find(product => product.id === Number(id))
    const relatedproducts= productslist.filter(productrelated => productrelated.category.id === findproduct.category.id)

    return (
        <div>
            <Col >
                            <Card  bg='dark' variant='dark'>
                                <div className="detail-imgs">
                                <Card.Img className='img detail' variant="top" src={findproduct?.productImgs[0]} />
                                <Card.Img className='img detail' variant="top" src={findproduct?.productImgs[1]} />
                                <Card.Img className='img detail' variant="top" src={findproduct?.productImgs[2]} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{findproduct?.title}</Card.Title>
                                    <Card.Text>
                                        {findproduct.description}
                                    </Card.Text>
                                    <Card.Text>price:{findproduct.price}</Card.Text>

                                    <Card.Text>id:{findproduct.id}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
            
            <h3> related products</h3>
{
    relatedproducts.map(relatedproduct=> (
        <Link key={relatedproduct.id} to={`/product/${relatedproduct.id}`}><li>{relatedproduct.title}</li></Link>
    ))
}

        </div>
    );
};

export default ProductDetail;