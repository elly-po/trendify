import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master TikTok Marketing with
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"> AI-Powered Analytics</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bridge the gap between brands and creators with data-driven insights, automated campaign management, and intelligent trend discovery. Grow your TikTok presence with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/creator" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 text-center"
              >
                Start as Creator
              </Link>
              <Link 
                to="/brand" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 text-center"
              >
                Start as Brand
              </Link>
            </div>
            <Link 
              to="/features" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-all"
            >
              Watch Demo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-2">25K+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">$10M+</div>
              <div className="text-gray-600">Campaign Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-500 mb-2">3.4x</div>
              <div className="text-gray-600">Average ROAS Improvement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;