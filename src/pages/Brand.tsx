import { TrendingUp, Users, Target, DollarSign, Calendar, Search, BarChart3, Settings, Star, Eye, Heart } from "lucide-react";

function Brand() {
  // Mock data for demonstration
  const campaignStats = {
    activeCampaigns: "12",
    totalSpend: "$47.2K",
    avgROAS: "4.2x",
    creatorsWorkedWith: "184"
  };

  const activeCampaigns = [
    {
      id: 1,
      name: "Holiday Collection Launch",
      status: "Active",
      budget: "$8,500",
      spent: "$6,240",
      creators: 8,
      reach: "2.4M",
      engagement: "156K",
      endDate: "Dec 31, 2024"
    },
    {
      id: 2,
      name: "Fitness Challenge 2025",
      status: "Active",
      budget: "$12,000",
      spent: "$4,830",
      creators: 12,
      reach: "3.1M",
      engagement: "287K",
      endDate: "Jan 15, 2025"
    },
    {
      id: 3,
      name: "Tech Review Series",
      status: "Planning",
      budget: "$6,800",
      spent: "$0",
      creators: 5,
      reach: "0",
      engagement: "0",
      endDate: "Feb 1, 2025"
    }
  ];

  const topCreators = [
    {
      id: 1,
      name: "@fitlifejenny",
      followers: "450K",
      engagement: "8.2%",
      niche: "Fitness & Wellness",
      price: "$1,200",
      rating: 4.9,
      avatar: "💪"
    },
    {
      id: 2,
      name: "@techreviewpro",
      followers: "320K",
      engagement: "7.8%",
      niche: "Technology",
      price: "$950",
      rating: 4.8,
      avatar: "📱"
    },
    {
      id: 3,
      name: "@stylegurumax",
      followers: "680K",
      engagement: "9.1%",
      niche: "Fashion & Style",
      price: "$1,800",
      rating: 4.9,
      avatar: "👗"
    },
    {
      id: 4,
      name: "@foodadventurer",
      followers: "290K",
      engagement: "6.5%",
      niche: "Food & Lifestyle",
      price: "$750",
      rating: 4.7,
      avatar: "🍕"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Dashboard</h1>
          <p className="text-gray-600">Manage campaigns, discover creators, and track your TikTok marketing performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.activeCampaigns}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+3 new this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.totalSpend}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+15.2% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. ROAS</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.avgROAS}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+0.3x from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Creators</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.creatorsWorkedWith}</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+28 new partnerships</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  New Campaign
                </button>
              </div>
              
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Budget</p>
                        <p className="font-medium">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Spent</p>
                        <p className="font-medium">{campaign.spent}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Creators</p>
                        <p className="font-medium">{campaign.creators}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Reach</p>
                        <p className="font-medium">{campaign.reach}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Ends: {campaign.endDate}</span>
                      <div className="flex items-center space-x-2 text-sm">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span>{campaign.reach}</span>
                        <Heart className="h-4 w-4 text-gray-400 ml-2" />
                        <span>{campaign.engagement}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tools & Creator Discovery */}
          <div className="space-y-6">
            {/* Brand Tools */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Brand Tools</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Search className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-700">Creator Discovery</span>
                </button>
                <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-700">Campaign Analytics</span>
                </button>
                <button className="w-full flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Calendar className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-700">Campaign Planner</span>
                </button>
                <button className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-700">Brand Settings</span>
                </button>
              </div>
            </div>

            {/* Top Recommended Creators */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Creators</h2>
              <div className="space-y-4">
                {topCreators.slice(0, 3).map((creator) => (
                  <div key={creator.id} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{creator.avatar}</div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{creator.name}</h3>
                          <p className="text-xs text-gray-500">{creator.niche}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{creator.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{creator.price}</p>
                        <p className="text-xs text-gray-500">{creator.followers}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Engagement: {creator.engagement}</span>
                        <button className="text-purple-600 hover:text-purple-700 font-medium">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-center py-2 text-purple-600 hover:text-purple-700 font-medium">
                  Discover More Creators
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Launch New Campaign</h3>
            <p className="text-purple-100 mb-4">Create targeted campaigns with AI-powered creator matching and automated optimization.</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Start Campaign
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Discover Top Talent</h3>
            <p className="text-blue-100 mb-4">Find creators that align with your brand values and target audience for maximum impact.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Browse Creators
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Track Performance</h3>
            <p className="text-green-100 mb-4">Monitor campaign metrics, ROI, and creator performance with real-time analytics.</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;