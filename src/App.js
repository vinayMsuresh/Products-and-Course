import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Course from './components/Course';
import Form_Reg from './components/Form_Reg';
import Product from './components/Product';
import User_display from './components/User_display';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/src" className="text-white">ProductUserCourse</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style={{marginLeft: 300}}>
        <Nav.Link href="/" className="text-white" style={{marginLeft: 25}}>Home</Nav.Link>
        <Nav.Link href="/course" className="text-white" style={{marginLeft: 30}}>Courses</Nav.Link>
        <Nav.Link href="/display" className="text-white" style={{marginLeft: 30}}>Display_Users</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

<Router>
  <Routes>
    <Route path="/" element={<Product/>} />
    <Route path="/course" element={<Course/>} />
    <Route path="/display" element={<User_display/>} />
    <Route path="/form" element={<Form_Reg/>} />
  </Routes>
</Router>
    </div>
  );
}

export default App;
