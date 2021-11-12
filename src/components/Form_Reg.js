import axios from 'axios';
import React,{useState} from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {useSelector} from 'react-redux';
const regforEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function Form_Reg() {
    let [uname, setUname] = useState('');
        let [email, setEmail] = useState('');
        let [age, setAge] = useState('');
        let [college, setCollege] = useState('');
        let [error, setError] = useState({
            uname:'',
            email:'',
            age:'',
            college:''
        });
        const course = useSelector(state => state)
        const navigate = useNavigate();

        const handle = (event)=>{
            let{name, value} = event.target;
            switch(name){
                case 'uname': setUname(value);
                setError({...error, uname: value.length < 4 ? "Username must be atleast 4 characters": ""});
                break;
                case 'email': setEmail(value);
                setError({...error, email: regforEmail.test(value) ? "": "Email is not valid"});
                break;
                case 'age': setAge(value);
                setError({...error, age: value < 18 || value > 60 ? "Age is not valid": ""});
                break;
                case 'college': setCollege(value);
                setError({...error, college: value.length < 10 ? "College name must be atleast 8 characters": ""});
                break;

            }
        }

        const handleSubmit = async() =>{
            let postData = {username: uname, email: email, age: age, college_name: college, course_id: course.course_id, course_name: course.course_name};
            if(validate(error)){
                await axios.post("http://localhost:3001/users", postData)
                alert("Course registered successfully");
                navigate("/course");
            }
            else{
                alert("Fill all the fields correctly");
            }
        }

        const validate = (error) =>{
            let valid = true;
            Object.values(error).find(er=>er.length > 1) && (valid = false);
            return valid;
        } 
    return (
        
        <>
        <h2 className="bg-info text-white p-2 m-0">COURSE ENQUIRY</h2>
           <Container  fluid className="bg-warning pb-4">
               <Container>
                <h2 className="p-4 bg-secondary">Registration for {course.course_name} course</h2>
               </Container>
           <Form>
<Form.Group as={Row} className="mb-3 pt-4">
    <Form.Label column sm="3">
      Username
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" name="uname" placeholder="Enter UserName" onChange={handle} />
      {error.uname.length > 1 && <Alert variant="danger" className="mt-2">
    {error.uname}
  </Alert>}
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="3">
      Email
    </Form.Label>
    <Col sm="6">
      <Form.Control type="email" name="email" placeholder="Enter Email" onChange={handle} />
      {error.email.length > 1 && <Alert variant="danger" className="mt-2">
    {error.email}
  </Alert>}
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="3">
      Age
    </Form.Label>
    <Col sm="6">
      <Form.Control type="number" name="age" placeholder="Enter Age" onChange={handle}  />
      {error.age.length > 1 && <Alert variant="danger" className="mt-2">
    {error.age}
  </Alert>}
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="3">
      College
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" name="college" placeholder="Enter College Name" onChange={handle} />
      {error.college.length > 1 && <Alert variant="danger" className="mt-2">
    {error.college}
  </Alert>}
    </Col>
  </Form.Group>

  <Button onClick={()=>{handleSubmit()}} variant="success">Submit</Button>
</Form>
               </Container> 
        </>
    )
}
