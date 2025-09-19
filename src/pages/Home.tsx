import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your TikTok Strategy?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of creators and brands who are already growing with TrendifyGo's AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/creator" 
                className="bg-white text-purple-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 text-center"
              >
                Start as Creator
              </Link>
              <Link 
                to="/brand" 
                className="bg-white text-purple-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 text-center"
              >
                Start as Brand
              </Link>
            </div>
            <Link 
              to="/about" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;