import { Link } from "wouter";

function Features() {
  const features = [
    {
      icon: "📊",
      title: "Real-Time Analytics",
      description: "Track engagement rates, audience demographics, and performance metrics with live data updates from TikTok's API.",
      link: "/creator",
      audience: "creators"
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for optimal posting times, trending hashtags, and content strategies.",
      link: "/creator",
      audience: "creators"
    },
    {
      icon: "🎯",
      title: "Influencer Discovery",
      description: "Find the perfect creators for your brand with advanced filtering by audience, engagement, and niche.",
      link: "/brand",
      audience: "brands"
    },
    {
      icon: "📈",
      title: "Trend Monitoring",
      description: "Stay ahead of viral content with real-time trend detection and predictive analytics.",
      link: "/creator",
      audience: "both"
    },
    {
      icon: "🚀",
      title: "Campaign Automation",
      description: "Automate campaign creation, management, and optimization with TikTok Ads API integration.",
      link: "/brand",
      audience: "brands"
    },
    {
      icon: "💰",
      title: "ROI Tracking",
      description: "Measure campaign performance with detailed attribution tracking and ROI calculations.",
      link: "/brand",
      audience: "brands"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Dominate TikTok
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From analytics to automation, TrendifyGo provides the complete toolkit for TikTok marketing success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg hover:bg-white transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">For {feature.audience}</span>
                <span className="text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;