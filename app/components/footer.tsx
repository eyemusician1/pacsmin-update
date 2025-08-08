"use client"

import Link from "next/link"
import { FlaskRoundIcon as Flask, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Flask className="h-10 w-10 text-blue-400 animate-float" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold">PACSMIN</span>
            </Link>
            <p className="text-blue-100 text-lg leading-relaxed mb-6 max-w-md">
              Empowering chemistry students across the Philippines through innovation, 
              collaboration, and scientific excellence. Join our growing community today!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors hover:scale-110 transform duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors hover:scale-110 transform duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors hover:scale-110 transform duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-blue-300">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Home</Link></li>
              <li><Link href="/events" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Events</Link></li>
              <li><Link href="/store" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Store</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">About Us</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Research</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-blue-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center hover:text-blue-300 transition-colors">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-blue-100">info@pacsmin.org</span>
              </li>
              <li className="flex items-center hover:text-blue-300 transition-colors">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-blue-100">+63 2 123 4567</span>
              </li>
              <li className="flex items-start hover:text-blue-300 transition-colors">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                <span className="text-blue-100">
                  University Belt, Manila<br />
                  Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 mb-4 md:mb-0">
            © 2024 PACSMIN. All rights reserved. Made with love for chemistry students.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
