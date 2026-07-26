import { useState } from "react";
import { Star, MapPin, Check } from "lucide-react";

export default function TripPayment() {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const destination = "AKGEC, Ghaziabad";
  const fare = 184;
  const driverName = "Rakesh";

  const breakdown = [
    { label: "Base fare", value: 52 },
    { label: "Distance · 8.2 km", value: 118 },
    { label: "Platform fee", value: 14 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f5] flex justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-[white]">

        <div className="flex justify-center py-6">
          <div className="w-14 h-14 rounded-full bg-[#0EA47A] flex items-center justify-center">
            <Check size={24} className="text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#14171A]">
            Trip complete
          </h1>

          <p className="mt-2 flex justify-center items-center gap-1 text-gray-500">
            <MapPin size={15} className="text-[#0EA47A]" />
            You arrived at {destination}
          </p>
        </div>

        <div className="bg-white border border-[#E7E5DF] rounded-2xl p-6 mb-4">
          <div className="text-center mb-5">
            <h2 className="text-4xl font-bold text-[#14171A]">
              ₹{fare}
            </h2>

            <p className="text-xs text-gray-500 uppercase mt-1">
              Paid via UPI · RideFlow Wallet
            </p>
          </div>

          <div className="border-t border-[#EFEDE7] pt-4 space-y-3">
            {breakdown.map((item) => (
              <div
                key={item.label}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-500">
                  {item.label}
                </span>

                <span className="font-medium">
                  ₹{item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E7E5DF] rounded-2xl p-6 mb-6">
          <p className="text-center mb-4">
            Rate your ride with{" "}
            <span className="font-semibold">{driverName}</span>
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setRating(star);
                  setSubmitted(false);
                }}
              >
                <Star
                  size={30}
                  className={
                    star <= rating
                      ? "fill-[#F0A93C] text-[#F0A93C]"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full py-3.5 rounded-xl bg-[#14171A] text-white font-semibold hover:bg-[#0EA47A]"
        >
          {submitted ? "Thanks for rating" : "Done"}
        </button>

      </div>
    </div>
  );
}