import { Button, Col, Form, Row } from 'react-bootstrap';
import './Login.scss';

const titleStyle = {
  marginBottom: '64px'
};

const LoginScreen = () => {
  return (
    <Row className='loginContainer g-0'>
      <Col sm={7} className='aboutSection'>
      </Col>
      <Col sm={5} className='loginSection'>
        <h1 style={titleStyle}>MediaHub</h1>
        <LoginForm />
      </Col>
    </Row>
  );
};

const LoginForm = () => {

  const continueAsGuest = async () => {
    console.log("Logging in as guest...");
    await (window as any).api.invokeMessage('login-guest');
  };

  return (
    <div className='loginForm'>
      <Form>
        <Form.Group className='mb-3' controlId='formLogin'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
        <Row>
          <Col>
            <Button className='w-100' variant='primary' type='submit' disabled>
              Submit
            </Button>
          </Col>
          <Col className='g-0'>
            <Button className='w-100' variant='warning' type='submit' onClick={continueAsGuest}>
              Continue as Guest
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default LoginScreen;
