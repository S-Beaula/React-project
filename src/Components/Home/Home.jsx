import React from 'react';
import { Carousel, Form, Button } from 'react-bootstrap';

const Home = () => {
  const images = [
    "https://as2.ftcdn.net/v2/jpg/03/85/26/33/1000_F_385263374_D0uaL7v6vw2mVoCCARTLOPCxhkDZcb7f.jpg",
    "https://tse3.mm.bing.net/th?id=OIP.OeFlJ8IJeCURxnKyjrx3nQHaEJ&pid=Api&P=0&h=180",
    "https://i.pinimg.com/originals/06/0f/04/060f046830289f308e3366db39c88f08.jpg",
    "https://wallpapercave.com/wp/wp7488228.jpg",
    "https://www.organizedmom.net/wp-content/uploads/2022/12/how-to-plan-a-surprise-birthday-party-000.jpg"
  ];

  return (
    <div 
      className='d-flex flex-column align-items-center justify-content-center w-100' 
      style={{ minHeight: '100vh', background: '#282c34', color: 'white', overflow: 'hidden' }}
    >
      <h1 className='display-3 mb-3'>Welcome to Memory Vault</h1>
      <p className='fs-4 mb-2'>Your secure space for storing memories</p>
    <Carousel className='w-50 rounded-circle' indicators={false}>
        {images.map((src, index) => (
          <Carousel.Item key={index}>
            <img 
              className='d-block w-100 rounded-circle shadow' 
              src={src} 
              style={{ maxHeight: '400px', objectFit:"fill" }} 
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
