import React from 'react';

/**
 * Footer Component
 * Standard website footer with links.
 */
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white">AstroAI</h3>
            <p className="mt-2 text-sm text-gray-400">Authentic guidance for modern life. Our mission is to provide trusted astrological services with transparency and fairness.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-white">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-white">Our Experts</a></li>
              <li><a href="#" className="text-sm hover:text-white">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Services</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-white">Chat with Astrologer</a></li>
              <li><a href="#" className="text-sm hover:text-white">Talk to Astrologer</a></li>
              <li><a href="#" className="text-sm hover:text-white">AstroMall Shop</a></li>
              <li><a href="#" className="text-sm hover:text-white">Free Horoscope</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Support</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-white">Refund Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} AstroAI. All rights reserved.</p>
          {/* Social Icons would go here */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Icons placeholders */}
            <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span>FB</a>
            <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span>IN</a>
            <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span>TW</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
