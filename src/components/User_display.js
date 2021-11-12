import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Card, Col  } from 'react-bootstrap';

export default function User_display() {
    let [users, setUsers] = useState([]);
    useEffect(async()=>{
        const cors = await axios.get("http://localhost:3001/users");
        setUsers(cors.data);
    },[]);
    return (
        <>
        <h2 className="bg-secondary text-white p-2 m-0">User Enquired</h2>
   <Container fluid className="bg-warning">
       
       <Row className="pb-4">
   {users.map(data => 
   <Col lg={4} key={data.id}><Card className="mt-4">
<Card.Body>
<Card.Title><h1>{data.username}</h1></Card.Title><hr />
<Card.Subtitle><h2>{data.course_name}</h2></Card.Subtitle><hr />

<Card.Text>
<h4 className="text-left">Email: {data.email}</h4>
<h4 className="text-left">Age: {data.age}</h4>
<h4 className="text-left">College Name: {data.college_name}</h4>
</Card.Text>
</Card.Body>
</Card></Col>
     )}</Row>
       </Container>
   </>
    )
}
