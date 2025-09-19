function Features() {
  const features = [
    {
      icon: "📊",
      title: "Real-Time Analytics",
      description: "Track engagement rates, audience demographics, and performance metrics with live data updates from TikTok's API."
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for optimal posting times, trending hashtags, and content strategies."
    },
    {
      icon: "🎯",
      title: "Influencer Discovery",
      description: "Find the perfect creators for your brand with advanced filtering by audience, engagement, and niche."
    },
    {
      icon: "📈",
      title: "Trend Monitoring",
      description: "Stay ahead of viral content with real-time trend detection and predictive analytics."
    },
    {
      icon: "🚀",
      title: "Campaign Automation",
      description: "Automate campaign creation, management, and optimization with TikTok Ads API integration."
    },
    {
      icon: "💰",
      title: "ROI Tracking",
      description: "Measure campaign performance with detailed attribution tracking and ROI calculations."
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
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;