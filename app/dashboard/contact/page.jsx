import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">ryhnakhtar@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">123 Example Street, City, Country</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <p className="text-sm text-gray-600">
            Our support team is available Monday to Friday from 9am to 5pm.
          </p>
        </div>
      </div>
    </div>
  )
}
