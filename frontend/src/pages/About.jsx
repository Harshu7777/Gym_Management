import React from 'react';
import {
  Dumbbell,
  Clock,
  Users,
  Trophy,
  Target,
  Heart,
  Smile,
  Star,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

function About() {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "2000+", label: "Active Members" },
    { icon: <Trophy className="w-8 h-8" />, value: "15+", label: "Expert Trainers" },
    { icon: <Dumbbell className="w-8 h-8" />, value: "50+", label: "Fitness Programs" },
    { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Gym Access" }
  ];

  const trainers = [
    {
      name: "Sarah Johnson",
      role: "Head Trainer",
      photo: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=400&h=400&fit=crop",
      specialties: ["Strength Training", "HIIT", "Nutrition"]
    },
    {
      name: "Mike Thompson",
      role: "Fitness Coach",
      photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
      specialties: ["CrossFit", "Weight Loss", "Bodybuilding"]
    },
    {
      name: "Emma Davis",
      role: "Yoga Instructor",
      photo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
      specialties: ["Yoga", "Meditation", "Flexibility"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-400">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
          alt="Gym Interior"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Transform Your Life</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">Where fitness meets community and results become reality</p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center text-purple-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-100 mb-6 leading-relaxed text-xl">
              Founded in 2010, PowerFit has grown from a small local gym to a premier fitness destination. 
              Our mission is to provide an inclusive, motivating environment where everyone can achieve their fitness goals.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-50">
                <Target className="w-6 h-6 text-purple-600" />
                <span>Goal-oriented Training</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-50">
                <Heart className="w-6 h-6 text-purple-600" />
                <span>Holistic Wellness</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-50">
                <Smile className="w-6 h-6 text-purple-600" />
                <span>Supportive Community</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-50">
                <Star className="w-6 h-6 text-purple-600" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=500&fit=crop"
              alt="Gym Equipment"
              className="rounded-xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=500&fit=crop"
              alt="Training Session"
              className="rounded-xl shadow-lg mt-8"
            />
          </div>
        </div>
      </div>

      {/* Trainers Section */}
      <div className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Expert Trainers</h2>
            <p className="text-gray-400">Dedicated professionals committed to your success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                  <p className="text-purple-400 mb-4">{trainer.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-50 text-xl">Have questions? We're here to help!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <button className="w-full px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <p className="text-gray-600">123 Fitness Street<br />New York, NY 10001</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold  mb-4">Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 5:00 AM - 11:00 PM</p>
                <p>Saturday - Sunday: 6:00 AM - 10:00 PM</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-8">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
