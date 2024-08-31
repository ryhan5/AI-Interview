"use client"
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here send the form data to backend
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 bg-gradient-to-b from-purple-100 to-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">Contact Us</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-purple-700 p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>ryhnakhtar@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+91 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Techno India University, West Bengal, India</span>
            </div>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Our support team is available Monday to Friday from 9am to 5pm.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">Send us a Message</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
