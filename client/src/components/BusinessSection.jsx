import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hidden md:block pb-20 px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-20 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-600">
                Enterprise platform
              </span>
            </div>

            <h2 className="text-5xl font-bold leading-[1.1] tracking-tight mb-5">
              RideFlow for{" "}
              <span className="text-gray-400">Business.</span>
              <br />
              Built for teams.
            </h2>

            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md">
              Manage employee travel, airport transfers, and client pickups
              through a single platform. Real-time tracking, centralized
              billing, and fleet visibility — all in one place.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center gap-2"
              >
                Get started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => navigate("/about")}
                className="text-sm text-gray-500 border-b border-gray-300 pb-0.5 hover:border-black hover:text-black transition flex items-center gap-1"
              >
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "00k+", label: "Companies" },
                { num: "00%", label: "On-time rate" },
                { num: "4.9★", label: "Avg rating" },
              ].map(({ num, label }) => (
                <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-2xl font-bold tracking-tight">{num}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px]">
    
            <div className="absolute top-0 left-8 right-0 bottom-10 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
                alt="Business team at work"
                className="w-full h-full object-cover"
              />
            </div>


            <div className="absolute bottom-0 left-0 w-[52%] h-[200px] rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop"
                alt="Corporate pickup service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessSection;