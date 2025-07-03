import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* OneDigital Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/OneDigital_Logo_4color_2022-removebg-preview.png" 
                alt="OneDigital Logo" 
                className="h-8 w-auto brightness-0 invert"
              />
              <div className="text-xs text-gray-400">
                Intern Connect Platform
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering the next generation of digital leaders through 
              comprehensive internship programs and professional development.
            </p>
            <div className="text-xs text-gray-400">
              Building tomorrow's solutions today.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Platform</h3>
            <div className="space-y-2 text-sm">
              <Link to="/dashboard" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
              <Link to="/activity-feed" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Activity Feed
              </Link>
              <Link to="/connection-hub" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Directory
              </Link>
              <Link to="/program-itinerary" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Events
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">OneDigital</h3>
            <div className="space-y-2 text-sm">
              <a 
                href="https://www.onedigital.com/about-us/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                About Us
              </a>
              <a 
                href="https://www.onedigital.com/careers/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Careers
              </a>
              <a 
                href="https://www.onedigital.com/newsroom/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Newsroom
              </a>
              <a 
                href="https://www.onedigital.com/contact-us/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Support & Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Support</h3>
            <div className="space-y-2 text-sm">
              <Link to="/help" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Help Center
              </Link>
              <Link to="/privacy" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <a 
                href="mailto:interns@onedigital.com" 
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2024 Digital Insurance LLC. All rights reserved. OneDigital® is a registered trademark.
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.linkedin.com/company/onedigitalgroup"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Icon name="Linkedin" size={20} />
            </a>
            <a 
              href="https://www.onedigital.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Icon name="Globe" size={20} />
            </a>
            <div className="text-sm text-gray-500">
              Made with ❤️ for OneDigital Interns
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 