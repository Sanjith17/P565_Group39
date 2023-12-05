import React from 'react';
import ImageOne from './images.png'; // Adjust the import path to where your image is stored
import ImageTwo from './istockphoto-939051730-612x612.jpg'; // Adjust the import path accordingly


function AboutUs (){
  return (
    <div className="about-us">
      <h1>About FastFlex</h1>
      <p>FastFlex is a shipping company that provides users with the ability to track their shipments on a map and create new shipments through our website. We are dedicated to ensuring a smooth shipping experience and providing reliable and fast service to all our customers.</p>
      <div className="slogan">
        <h2>Our Slogan</h2>
        <p>"Ensuring a smooth experience with our shipping and delivering reliable and fast service to our customers."</p>
      </div>
      <div className="team-info">
        <h2>Our Team</h2>
        <ul>
          <li>Sanjith Reddy P V - Leader</li>
          <li>Hetshree Patel - Team Member</li>
          <li>Scott Zhu - Team Member</li>
          <li>Prateek Giridhar - Team Member</li>
          <li>Yan Liang - Team Member</li>
        </ul>
      </div>
      <div className="images">
        <h2>What We Do</h2>
        <img src={ImageOne} alt="Shipping visualization" />
        <img src={ImageTwo} alt="Package delivery" />
      </div>
    </div>
  );
};

export default AboutUs;