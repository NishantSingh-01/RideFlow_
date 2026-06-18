import React from "react";

const Footer = ({ showOnMobile = true }) => {
  return (
    <footer
      className={`bg-black text-white ${
        showOnMobile ? "block" : "hidden md:block"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4">RideFlow</h2>
            <p className="text-gray-400">
              Book rides instantly, travel safely, and reach your destination
              comfortably with RideFlow.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>

            <ul className="space-y-2 text-gray-400">
              <li>Ride Booking</li>
              <li>Airport Transfer</li>
              <li>Ride Sharing</li>
              <li>Corporate Travel</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-gray-400">
              <p>
                <i className="fa-solid fa-envelope mr-2"></i>
                support@rideflow.com
              </p>

              <p>
                <i className="fa-solid fa-phone mr-2"></i>
                +91 98765 43210
              </p>

              <div className="flex gap-4 text-xl pt-2">
                <a href="#">
                  <i className="fa-brands fa-facebook hover:text-blue-500"></i>
                </a>

                <a href="#">
                  <i className="fa-brands fa-instagram hover:text-pink-500"></i>
                </a>

                <a href="#">
                  <i className="fa-brands fa-x-twitter hover:text-sky-500"></i>
                </a>

                <a href="#">
                  <i className="fa-brands fa-linkedin hover:text-blue-400"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 RideFlow. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms of Service
            </a>

            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;