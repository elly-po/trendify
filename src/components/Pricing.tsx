import { Link } from "react-router-dom";

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
        "Community support"
      ],
      cta: "Get Started",
      popular: false
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
        "Email support",
        "Competitor analysis"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Brand Starter",
      price: "$99",
      period: "/month",
      description: "Essential tools for small brands",
      features: [
        "Team collaboration (up to 5 users)",
        "Influencer discovery (50 searches/month)",
        "Campaign tracking",
        "Basic automation tools",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Brand Growth",
      price: "$299",
      period: "/month",
      description: "Complete solution for growing brands",
      features: [
        "Unlimited team members",
        "Advanced influencer discovery",
        "Automated campaign management",
        "Custom reporting",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Growth Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From individual creators to enterprise brands, we have the perfect plan to accelerate your TikTok success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.cta === "Contact Sales" ? (
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700' 
                    : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                }`}>
                  {plan.cta}
                </button>
              ) : (
                <Link 
                  to={plan.name.toLowerCase().includes('creator') ? '/creator' : '/brand'}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-center block ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700' 
                      : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need something custom?</p>
          <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            Contact us for Enterprise pricing →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;