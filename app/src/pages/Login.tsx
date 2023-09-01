import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useAppContext } from '../ApplicationContext'
import './Login.scss';

const titleStyle = {
  marginBottom: '64px'
};

const LoginScreen = () => {
  const { setAppState } = useAppContext();

  useEffect(() => {
    setAppState(prevState => ({
      ...prevState,
      menuBarHidden: true
    }));

    return () => {
      setAppState(prevState => ({
        ...prevState,
        menuBarHidden: false
      }));
    }
  }, [setAppState]);

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

const loadPlaylists = async (user: string) => {
  const ipc = (window as any).api;
  const playlists: any[] = await ipc.invokeMessage('load-playlists', user);
}

const LoginForm = () => {
  const navigate = useNavigate();

  const continueAsGuest = () => {
    loadPlaylists('guest');
    navigate('/home');
  }

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
