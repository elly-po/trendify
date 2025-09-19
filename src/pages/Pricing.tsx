import { Link } from "wouter";
import { Check, Star, Zap, Users, BarChart3, Headphones } from "lucide-react";

function Pricing() {
  const plans = [
    {
      name: "Creator Free",
      price: "Free",
      description: "Perfect for individual creators getting started",
      features: [
        "Basic analytics for 1 TikTok account",
        "7-day data history",
        "Basic trend monitoring",
        "Community support",
        "Up to 100 hashtag searches/month",
        "Email notifications"
      ],
      cta: "Get Started Free",
      popular: false,
      userType: "creator",
      limitations: "Limited to 1 account, basic features only"
    },
    {
      name: "Creator Pro",
      price: "$29",
      period: "/month",
      description: "Advanced insights for growing creators",
      features: [
        "Analytics for up to 3 accounts",
        "90-day data history",
        "Advanced insights & recommendations",
        "AI-powered content suggestions",
        "Email & chat support",
        "Competitor analysis",
        "Unlimited hashtag research",
        "Brand partnership opportunities",
        "Content scheduling (50 posts/month)"
      ],
      cta: "Start Free Trial",
      popular: true,
      userType: "creator",
      savings: "Most popular choice for creators"
    },
    {
      name: "Brand Starter",
      price: "$99",
      period: "/month",
      description: "Essential tools for small brands",
      features: [
        "Team collaboration (up to 5 users)",
        "Creator discovery (100 searches/month)",
        "Campaign tracking (5 active campaigns)",
        "Basic automation tools",
        "Priority email support",
        "ROI tracking and reporting",
        "Audience analysis tools",
        "Brand safety monitoring"
      ],
      cta: "Start Free Trial",
      popular: false,
      userType: "brand",
      limitations: "Limited campaigns and team size"
    },
    {
      name: "Brand Growth",
      price: "$299",
      period: "/month",
      description: "Complete solution for growing brands",
      features: [
        "Unlimited team members",
        "Advanced creator discovery (unlimited)",
        "Unlimited active campaigns",
        "Full automation suite",
        "Dedicated account manager",
        "Custom reporting & analytics",
        "API access for integrations",
        "Advanced audience targeting",
        "Multi-platform campaign management",
        "Phone & priority support"
      ],
      cta: "Start Free Trial",
      popular: false,
      userType: "brand",
      savings: "Save $588/year with annual billing"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solution for large organizations",
      features: [
        "Everything in Brand Growth",
        "White-label platform options",
        "Custom integrations",
        "Advanced security & compliance",
        "Dedicated customer success team",
        "Custom SLA agreements",
        "On-premise deployment options",
        "Advanced user management",
        "Custom reporting & dashboards"
      ],
      cta: "Contact Sales",
      popular: false,
      userType: "enterprise",
      note: "Perfect for agencies and large enterprises"
    }
  ];

  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
    },
    {
      question: "Is there a free trial?",
      answer: "All paid plans come with a 14-day free trial. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and offer annual billing discounts. Enterprise plans can pay via invoice."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! Cancel anytime with no penalty. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes! Save 20% with annual billing on all paid plans. Perfect for committed users looking to save."
    }
  ];

  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "Fashion Creator",
      followers: "850K",
      quote: "TrendifyGo helped me increase my brand partnerships by 300%. The analytics are incredible!",
      avatar: "👩‍🎨"
    },
    {
      name: "Alex Chen",
      role: "Marketing Director",
      company: "FitLife Brands",
      quote: "Our ROI improved by 4.2x after using TrendifyGo. The creator matching is spot-on.",
      avatar: "👨‍💼"
    },
    {
      name: "Maria Santos",
      role: "Lifestyle Creator",
      followers: "420K",
      quote: "Finally, a platform that understands creators. The insights help me create better content.",
      avatar: "✨"
    }
  ];

  const getPlanColor = (userType: string, popular: boolean) => {
    if (popular) return 'ring-2 ring-purple-500';
    switch (userType) {
      case 'creator': return 'border border-pink-200 hover:border-pink-300';
      case 'brand': return 'border border-blue-200 hover:border-blue-300';
      case 'enterprise': return 'border border-gray-200 hover:border-gray-300';
      default: return 'border border-gray-200';
    }
  };

  const getCtaStyle = (userType: string, popular: boolean) => {
    if (popular) return 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700';
    switch (userType) {
      case 'creator': return 'bg-pink-500 text-white hover:bg-pink-600';
      case 'brand': return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'enterprise': return 'bg-gray-800 text-white hover:bg-gray-900';
      default: return 'border-2 border-gray-300 text-gray-700 hover:border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Growth Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From individual creators to enterprise brands, we have the perfect plan to accelerate your TikTok success.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all relative ${getPlanColor(plan.userType, plan.popular)}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  {plan.savings && (
                    <p className="text-green-600 text-sm font-medium mt-2">{plan.savings}</p>
                  )}
                  {plan.limitations && (
                    <p className="text-orange-600 text-xs mt-2">{plan.limitations}</p>
                  )}
                  {plan.note && (
                    <p className="text-blue-600 text-sm font-medium mt-2">{plan.note}</p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 text-sm">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.cta === "Contact Sales" ? (
                  <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${getCtaStyle(plan.userType, plan.popular)}`}>
                    {plan.cta}
                  </button>
                ) : (
                  <Link 
                    to={plan.userType === 'creator' ? '/creator' : '/brand'}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-center block ${getCtaStyle(plan.userType, plan.popular)}`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need something custom or have questions?</p>
            <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              Contact our sales team for custom pricing →
            </button>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why TrendifyGo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just analytics - a complete ecosystem for TikTok success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Go beyond basic metrics with AI-powered insights and predictive analytics.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-gray-600">Connect brands with perfect creators using our intelligent matching algorithm.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automation</h3>
              <p className="text-gray-600">Streamline your workflow with automated campaign management and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Creators and Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users are saying about their success with TrendifyGo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    {testimonial.followers && (
                      <p className="text-purple-600 text-sm">{testimonial.followers} followers</p>
                    )}
                    {testimonial.company && (
                      <p className="text-blue-600 text-sm">{testimonial.company}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Growing?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of creators and brands already succeeding with TrendifyGo.
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

export default Pricing;