import React,{useState, useEffect} from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
export default function Product() {
    let [state, setState] = useState([]);
    useEffect(async() => {
       const res = await axios.get("http://localhost:3001/Product");
       setState(res.data);
    }, [])
    const addCart = (id)=>{
        if(localStorage.getItem('mycart')!=undefined){
            let arr = JSON.parse(localStorage.getItem('mycart'));
            if(arr.find(x => x.id == id) != undefined){
                let ind = arr.findIndex(x => x.id === id);
                arr[ind] = {id: id,quantity:arr[ind].quantity + 1};
                localStorage.setItem('mycart',JSON.stringify(arr));
                alert("Product quantity is incremented");
            }
            else{
            arr.push({id:id, quantity:1});
            localStorage.setItem('mycart',JSON.stringify(arr));
            alert("Product added to cart")
        }
            
        }
        else{
            let arr = [];
            arr.push({id:id, quantity:1});
            localStorage.setItem('mycart',JSON.stringify(arr));
            alert("Product added to cart")             
        }
    }
    return (
        <>
        <h2 className="bg-primary text-white p-2 m-0">LATEST PRODUCTS</h2>
        <Container fluid className="bg-info">
            
            <Row className="pb-4">
        {state.map(data => 
        <Col lg={4} key={data.pid}><Card className="mt-4">
  <Card.Img variant="top" src={`images/${data.images}`} width="500px" height="200px" />
  <Card.Body>
    <Card.Title><h2>Name: {data.pname}</h2></Card.Title><hr />
    <Card.Text>
    <h4>Price: {data.price}</h4>
    </Card.Text>
    <Button variant="primary"  onClick={()=>addCart(data.pid)}>Add to cart</Button>
  </Card.Body>
</Card></Col>
          )}</Row>
            </Container>
            </>
    )
}
