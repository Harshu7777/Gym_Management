import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Typography } from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import {Link} from "react-router-dom"
import TextLoop from "react-text-loop";

function HomePage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const brands = [
    {
      name: "Nike",
      image:
        "https://imgs.search.brave.com/xK7-pNntfmwX1bXrvp5jUbglQTq5RZgdzK9aMHFCgDU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaG9w/LmJvZHlidWlsZGlu/Zy5jb20vY2RuL3No/b3AvZmlsZXMvb3B0/aW11bS1udXRyaXRp/b24tZXNzZW50aWFs/LWFtaW5vLWVuZXJn/eS04MDA4NjEuanBn/P2Nyb3A9Y2VudGVy/JmhlaWdodD0xNDQw/JnY9MTcyNDczNDI3/OCZ3aWR0aD0xNDQw",
    },
    {
      name: "Adidas",
      image:
        "https://imgs.search.brave.com/7tS2jSIisvitsixU1ZhH5m6KnnN9naRGdeysye3ULeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI3L2Vm/LzAxLzI3ZWYwMWE5/Y2IzODMxZTc3MTIy/MDUxYzU5MGJhNWYw/LmpwZw",
    },
    {
      name: "Under Armour",
      image:
        "https://imgs.search.brave.com/GLBdHpOV5My_jrJbG8TViYVcpelH5rBdFvDYm0flOSg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2YwLzYy/L2VjL2YwNjJlYzMx/YTYxNjlkMjJmMTk4/ZTdjNzMzZDI0MmE0/LmpwZw",
    },
    {
      name: "Reebok",
      image:
        "https://imgs.search.brave.com/I_XCaemMbNYn0HchhGlpMvlPzBb3TSRM-40iusJwIA0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90cmFm/ZnQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzA0L21r/My1maXRuZXNzLmpw/Zw",
    },
    {
      name: "Puma",
      image:
        "https://imgs.search.brave.com/9Clp6ljsnqM9g9ChiYIdFAnFuGJNrXnC2JK9QkgsQUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90cmFm/ZnQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzA0L3Jl/ZC1waWxsLWZpdG5l/c3MuanBn",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/frontPage.jpg"
          alt="Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-6">TRANSFORM YOUR BODY</h1>
            
            <p className="text-xl mb-8">Join the ultimate fitness experience</p>
            <Button
              variant="contained"
              size="large"
              startIcon={<SportsGymnasticsIcon />}
              sx={{
                backgroundColor: "#ff4081",
                "&:hover": { backgroundColor: "#f50057" },
              }}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Advanced Equipment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <img
              src="https://img.freepik.com/free-photo/modern-urban-gym_23-2151918003.jpg?t=st=1736833556~exp=1736837156~hmac=01c8f1fce98ef3b6a6b1d981372c19a733c96e510ab988cae32d5550998c89dc&w=740"
              alt="Equipment"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                State-of-the-art Machines
              </h3>
              <p className="text-gray-300">
                Experience workout with our premium equipment collection
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <img
              src="https://img.freepik.com/premium-photo/blurred-cardio-machines-ai-generated_860599-11423.jpg?w=740"
              alt="Workout"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Personal Training
              </h3>
              <p className="text-gray-300">
                Get guidance from certified fitness experts
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <img
              src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114223.jpg?t=st=1736833656~exp=1736837256~hmac=83a9d37325aa1c4ba4b94450c0fe8e2c7db371976f17083927ce93bc191c63d5&w=826"
              alt="Fitness"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Specialized Programs
              </h3>
              <p className="text-gray-300">
                Custom workout plans for your fitness goals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Slider */}
      <div className="py-20 px-4 bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Trusted By Leading Brands
        </h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...sliderSettings}>
            {brands.map((brand, index) => (
              <div key={index} className="px-4">
                <div className="bg-gray-700 rounded-lg p-6 transform hover:scale-105 transition duration-300">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-white text-center">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* For Attachemnet  */}

      <div className="py-20 px-4 bg-gray-900 w-full">
        {/* Title Section */}
        <div className="text-4xl font-bold text-white text-center mb-8">
          <span style={{color: "Orange"}}>Get Starting Today</span>
        </div>

        <div className="flex justify-center items-center space-x-6">
          {/* Box 1 */}
          <div className="box1 w-80 bg-gray-800 p-9 rounded-lg shadow-lg text-center flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ai ai-ZoomOut mb-4"
            >
              <path d="M21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z" />
              <path d="M13 10.5H8" />
            </svg>
            <Typography variant="h6" className="text-white mb-4">
              Explore Perk
            </Typography>
          </div>

          {/* Box 2 */}
          <div className="box2 w-80 bg-gray-800 p-9 rounded-lg shadow-lg text-center flex flex-col items-center">
            <Typography variant="h6" className="text-white mb-4">
              <span className="material-symbols-outlined text-4xl">
                explore
              </span>
              <br />
              Take the Free Trial
            </Typography>
          </div>

          {/* Box 3 */}
          <div className="box3 w-80 bg-gray-800 p-9 rounded-lg shadow-lg text-center flex flex-col items-center">
            <Typography variant="h6" className="text-white mb-4">
              <span class="material-symbols-outlined text-4xl">360</span>
              <br />
              Take the Free Trial
            </Typography>
          </div>
        </div>

        {/* Disclaimer in a Box with Shadow */}
        <div className="bg-gray-800 p-9 rounded-lg shadow-lg mt-10 text-center max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm">
            *Classic memberships begin at $15 and PF Black Card® memberships
            begin at $24.99, billed monthly. Memberships may include 12-month
            commitment. State and local taxes may apply. Subject to an annual
            fee of $49. Prices may vary depending on location. Services and
            perks subject to availability and restrictions. Must be at least 18
            years old to enroll, or 13-17 with parent/guardian. State and local
            restrictions on tanning frequency with PF Black Card® memberships
            apply. Participating locations only. Locations independently owned
            and operated. See home club for details. We reserve the right to
            correct pricing errors or withdraw offer at any time. ©2025 Planet
            Fitness Franchising LLC
          </p>
        </div>
      </div>

      {/* Footer */}

      <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section with Links and Social Media Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="p-3">
            <Typography variant="h6" className="font-bold mb-4">
              About Us
            </Typography>
            <ul>
              <li><Link href="#" color="inherit">Our Story</Link></li>
              <li><Link href="#" color="inherit">Careers</Link></li>
              <li><Link href="#" color="inherit">Blog</Link></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="p-3">
            <Typography variant="h6" className="font-bold mb-4">
              Services
            </Typography>
            <ul>
              <li><Link href="#" color="inherit">Gym Membership</Link></li>
              <li><Link href="#" color="inherit">Personal Training</Link></li>
              <li><Link href="#" color="inherit">Group Classes</Link></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="p-3">
            <Typography variant="h6" className="font-bold mb-4">
              Quick Links
            </Typography>
            <ul>
              <li><Link href="#" color="inherit">Contact Us</Link></li>
              <li><Link href="#" color="inherit">Privacy Policy</Link></li>
              <li><Link href="#" color="inherit">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="p-5">
            <Typography variant="h6" className="font-bold mb-4">
              Follow Us
            </Typography>
            <div className="flex space-x-4">
              <Button variant="outlined" color="secondary" size="small">
                Facebook
              </Button>
              <Button variant="outlined" color="secondary" size="small">
                Instagram
              </Button>
              <Button variant="outlined" color="secondary" size="small">
                Twitter
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright Information */}
        <div className="text-center text-sm">
          <Typography variant="body2" color="inherit">
            © 2025 Planet Fitness. All rights reserved. <br />
            <Link href="#" color="inherit">Privacy Policy</Link> | <Link href="#" color="inherit">Terms & Conditions</Link>
          </Typography>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default HomePage;
