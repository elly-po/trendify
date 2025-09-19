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
          
          {/* Path Selection Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 mt-12">
            {/* Creator Section */}
            <Link 
              to="/creator" 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    Start as Creator
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Find the best deals from brands and companies needing your skills. Connect with brands looking for authentic partnerships.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center">📊 Analytics</span>
                  <span className="flex items-center">💰 Monetization</span>
                  <span className="flex items-center">🤝 Brand Partnerships</span>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:from-pink-600 group-hover:to-purple-700 transition-all">
                  Get Started →
                </div>
              </div>
            </Link>

            {/* Brand Section */}
            <Link 
              to="/brand" 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Start as Brand
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Get your products to the best recommended creators to meet your marketing needs. Discover perfect influencer matches.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center">🎯 Targeting</span>
                  <span className="flex items-center">📈 Campaigns</span>
                  <span className="flex items-center">⚡ Automation</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                  Get Started →
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <Link 
              to="/features" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Watch Demo & See All Features →
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