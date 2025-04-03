import React from 'react';
import { Carousel, Card, Button, Row, Col, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; 

const Home = () => {
  const images = [
    "https://as2.ftcdn.net/v2/jpg/03/85/26/33/1000_F_385263374_D0uaL7v6vw2mVoCCARTLOPCxhkDZcb7f.jpg",
    "https://tse3.mm.bing.net/th?id=OIP.OeFlJ8IJeCURxnKyjrx3nQHaEJ&pid=Api&P=0&h=180",
    "https://i.pinimg.com/originals/06/0f/04/060f046830289f308e3366db39c88f08.jpg",
    "https://wallpapercave.com/wp/wp7488228.jpg",
    "https://www.organizedmom.net/wp-content/uploads/2022/12/how-to-plan-a-surprise-birthday-party-000.jpg"
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Memory Vault</h1>
      <p className="home-subtitle">Your secure space for storing memories</p>

      <Carousel className="home-carousel">
        {images.map((src, index) => (
          <Carousel.Item key={index}>
            <img className="carousel-img" src={src} alt="Memory" />
          </Carousel.Item>
        ))}
      </Carousel>

      <Row className="home-features">
        {[
          { title: "Secure Storage", desc: "Your memories are encrypted and safely stored in the cloud." },
          { title: "Easy Access", desc: "Access your memories from anywhere, anytime." },
          { title: "AI Categorization", desc: "Our AI organizes your memories automatically." }
        ].map((item, index) => (
          <Col key={index} md={4}>
            <Card className="feature-card">
              <Card.Body>
                <h5 className="feature-title">{item.title}</h5>
                <p className="feature-desc">{item.desc}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button className="get-btn">Get Started</Button>

      <Row className="home-icons">
        {[
          { icon: "🔒", text: "End-to-End Encryption" },
          { icon: "📂", text: "Unlimited Storage" },
          { icon: "☁️", text: "Cloud Backup" },
          { icon: "📸", text: "AI Auto-Tagging" }
        ].map((feature, index) => (
          <Col key={index} md={3} className="icon-container">
            <div className="icon-circle">{feature.icon}</div>
            <p className="icon-text">{feature.text}</p>
          </Col>
        ))}
      </Row>

      <Row className="home-stats">
        {[
          { value: "10,000+", text: "Memories Stored" },
          { value: "5,000+", text: "Happy Users" },
          { value: "99.9%", text: "Uptime Guarantee" }
        ].map((stat, index) => (
          <Col key={index} md={4}>
            <h2 className="stat-value">{stat.value}</h2>
            <p className="stat-text">{stat.text}</p>
          </Col>
        ))}
      </Row>

      <Row className="ratings">
        {[
          { name: "Sarah", feedback: "Memory Vault is a lifesaver! I never lose my photos now.", rating: "⭐⭐⭐⭐⭐" },
          { name: "John", feedback: "Fast and secure! My memories are safe forever.", rating: "⭐⭐⭐⭐⭐" }
        ].map((testimonial, index) => (
          <Col key={index} md={6}>
            <Card className="rating-card">
              <Card.Body>
                <p className="testimonial-feedback">"{testimonial.feedback}"</p>
                <h6 className="testimonial-name">{testimonial.name}</h6>
                <p className="testimonial-rating">{testimonial.rating}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <Accordion>
          {[
            { question: "How does Memory Vault work?", answer: "Memory Vault securely stores your images and videos in the cloud." },
            { question: "Is my data safe?", answer: "Yes, we use end-to-end encryption to keep your data private." },
            { question: "Can I share my albums?", answer: "Yes, you can share albums with friends and family with custom permissions." }
          ].map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      <footer className="home-footer">
        &copy; {new Date().getFullYear()} Memory Vault. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
