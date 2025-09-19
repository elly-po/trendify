import { Link } from "react-router-dom";
import { BarChart3, Bot, Users, TrendingUp, Zap, DollarSign, Target, Calendar, Search, Shield, Globe, Smartphone } from "lucide-react";

function Features() {
  const mainFeatures = [
    {
      icon: <BarChart3 className="h-12 w-12 text-purple-600" />,
      title: "Real-Time Analytics Dashboard",
      description: "Track engagement rates, audience demographics, and performance metrics with live data updates from TikTok's API.",
      benefits: [
        "Live performance tracking across all your content",
        "Audience demographics and behavior insights",
        "Engagement pattern analysis",
        "Competitor benchmarking"
      ],
      userType: "both"
    },
    {
      icon: <Bot className="h-12 w-12 text-pink-600" />,
      title: "AI-Powered Content Insights",
      description: "Get intelligent recommendations for optimal posting times, trending hashtags, and content strategies.",
      benefits: [
        "Optimal posting time recommendations",
        "Trending hashtag discovery",
        "Content performance predictions",
        "Viral potential scoring"
      ],
      userType: "creators"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Intelligent Creator Discovery",
      description: "Find the perfect creators for your brand with advanced filtering by audience, engagement, and niche.",
      benefits: [
        "Advanced creator search and filtering",
        "Audience overlap analysis",
        "Engagement authenticity verification",
        "ROI prediction for partnerships"
      ],
      userType: "brands"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-green-600" />,
      title: "Trend Monitoring & Alerts",
      description: "Stay ahead of viral content with real-time trend detection and predictive analytics.",
      benefits: [
        "Real-time trend detection",
        "Viral content prediction",
        "Industry-specific trend alerts",
        "Opportunity notifications"
      ],
      userType: "both"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Campaign Automation Suite",
      description: "Automate campaign creation, management, and optimization with TikTok Ads API integration.",
      benefits: [
        "Automated campaign setup",
        "Budget optimization",
        "Performance-based adjustments",
        "Multi-creator coordination"
      ],
      userType: "brands"
    },
    {
      icon: <DollarSign className="h-12 w-12 text-indigo-600" />,
      title: "Advanced ROI Tracking",
      description: "Measure campaign performance with detailed attribution tracking and ROI calculations.",
      benefits: [
        "Multi-touch attribution modeling",
        "Revenue tracking and reporting",
        "Cost per acquisition analysis",
        "Lifetime value predictions"
      ],
      userType: "brands"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Audience Targeting",
      description: "Precise demographic and psychographic targeting tools"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Content Scheduler",
      description: "Plan and schedule content across multiple accounts"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Hashtag Research",
      description: "Discover and analyze trending hashtags in your niche"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Brand Safety Tools",
      description: "Ensure your content aligns with brand guidelines"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Market Insights",
      description: "Understand trends and preferences across different regions"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile-First Design",
      description: "Optimized experience for creators on the go"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to succeed on TikTok. From AI-powered analytics to automated campaign management, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/creator" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                Explore Creator Tools
              </Link>
              <Link 
                to="/brand" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Explore Brand Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for both creators and brands to maximize their TikTok marketing success.
            </p>
          </div>

          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="mb-6">{feature.icon}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{feature.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      feature.userType === 'creators' ? 'bg-pink-100 text-pink-800' :
                      feature.userType === 'brands' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {feature.userType === 'both' ? 'Creators & Brands' : 
                       feature.userType === 'creators' ? 'For Creators' : 'For Brands'}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link 
                      to={feature.userType === 'creators' ? '/creator' : feature.userType === 'brands' ? '/brand' : '/creator'}
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                    >
                      Try This Feature →
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-6xl mb-4">
                        {feature.icon}
                      </div>
                      <div className="space-y-3 max-w-xs">
                        <div className="h-3 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-4/5 mx-auto"></div>
                        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-3/5 mx-auto"></div>
                      </div>
                      <p className="text-gray-400 text-sm font-medium">Feature visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Powerful Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional features to supercharge your TikTok marketing efforts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Connect with the tools you already use to streamline your workflow.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <p className="text-sm text-gray-500">TikTok API</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-sm text-gray-500">Google Analytics</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <p className="text-sm text-gray-500">Stripe</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <p className="text-sm text-gray-500">Mailchimp</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <p className="text-sm text-gray-500">Slack</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <p className="text-sm text-gray-500">Canva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of creators and brands who are already growing with TrendifyGo's powerful features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/creator" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              Start as Creator
            </Link>
            <Link 
              to="/brand" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Start as Brand
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;