import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Container,Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
export default function Course(props) {
    let [course, setCourse] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(async()=>{
        const cors = await axios.get("http://localhost:3001/Course");
        setCourse(cors.data);
    },[]);

    const enquire=(id,name)=>{
        let payload = {id: id, name: name};
        dispatch({type:'ENQUIRY', payload: payload});
        navigate("/form");
    };

    return (
        <>
             <h2 className="bg-info text-white p-2 m-0">LATEST COURSES</h2>
        <Container fluid className="bg-warning">
            
            <Row className="pb-4">
        {course.map(data => 
        <Col lg={4} key={data.id}><Card className="mt-4" style={{height: 400}}>
  <Card.Body>
    <Card.Title><h2>{data.course_name}</h2></Card.Title><hr />
    <Card.Text>
        <p>{data.description}</p>
    <h4>Price: {data.price}</h4>
    </Card.Text>
    <Button variant="primary"  onClick={()=>enquire(data.id, data.course_name)}>Enquire</Button>
  </Card.Body>
</Card></Col>
          )}</Row>
            </Container>
        </>
    )
}
