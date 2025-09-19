import { Users, Target, BarChart3, Zap, Shield, Globe } from "lucide-react";

function About() {
  const stats = [
    { number: "25K+", label: "Active Creators" },
    { number: "$10M+", label: "Campaign Spend Managed" },
    { number: "3.4x", label: "Average ROAS" },
    { number: "184", label: "Countries Reached" }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Data-Driven Decisions",
      description: "Every recommendation and insight is backed by real-time data and advanced analytics to ensure maximum impact."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Creator-Brand Harmony",
      description: "We believe in authentic partnerships that benefit both creators and brands, fostering long-term relationships."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Innovation First",
      description: "Constantly evolving our AI algorithms and platform features to stay ahead of social media trends."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Trust & Transparency",
      description: "Clear metrics, honest reporting, and transparent processes build the foundation of successful partnerships."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former TikTok marketing executive with 8+ years in influencer marketing",
      avatar: "👩‍💼"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder", 
      bio: "Ex-Google AI researcher specializing in social media analytics and machine learning",
      avatar: "👨‍💻"
    },
    {
      name: "Elena Petrov",
      role: "Head of Creator Relations",
      bio: "Former top TikTok creator (2M+ followers) turned platform advocate",
      avatar: "🎬"
    },
    {
      name: "David Kim",
      role: "VP of Business Development",
      bio: "10+ years building partnerships between brands and digital creators",
      avatar: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">TrendifyGo</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're revolutionizing TikTok marketing by connecting brands with the perfect creators through AI-powered insights and data-driven matching.
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Globe className="h-5 w-5" />
              <span>Headquartered in San Francisco • Founded in 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                TikTok has become the most influential platform for brand discovery and creator economy growth. However, the gap between brands seeking authentic partnerships and creators looking for meaningful collaborations continues to widen.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                TrendifyGo bridges this gap with AI-powered analytics, intelligent matching algorithms, and comprehensive campaign management tools that benefit both sides of the creator economy.
              </p>
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-lg">
                <p className="font-semibold text-lg">
                  "Every successful partnership starts with understanding. We provide the data and insights to make those connections meaningful."
                </p>
                <p className="mt-2 opacity-90">— Sarah Chen, CEO</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">The Problem We Solve</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Brands struggle to find authentic creators who align with their values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Creators miss out on relevant partnership opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Campaign ROI is unpredictable without proper analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Manual processes waste time and resources</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals from top tech companies and successful creators who understand both sides of the industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Whether you're a creator looking to monetize your content or a brand seeking authentic partnerships, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/creator" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              Join as Creator
            </a>
            <a 
              href="/brand" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Start as Brand
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;