import { 
  TrendingUp, Target, DollarSign, Search, BarChart3, 
  Star, Eye, Heart, Loader2, Plus, Filter, ChevronRight, 
  Play, Pause, Edit, Globe, Award, Sparkles, Building2,
  ThumbsUp
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useState } from "react";

function Brand() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  
  // Fetch user profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const response = await apiRequest("/api/profile");
      return await response.json();
    },
    enabled: !!user,
  });

  // Fetch real campaigns data
  const { data: campaignsData } = useQuery({
    queryKey: ["campaigns", user?.id],
    queryFn: async () => {
      const response = await apiRequest("/api/campaigns");
      return await response.json();
    },
    enabled: !!user && user.userType === "brand",
  });

  // Fetch real creators data
  const { data: creatorsData } = useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const response = await apiRequest("/api/creators");
      return await response.json();
    },
    enabled: !!user,
  });

  // Fetch real analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ["analytics", selectedTimeframe],
    queryFn: async () => {
      const response = await apiRequest(`/api/analytics?timeframe=${selectedTimeframe}`);
      return await response.json();
    },
    enabled: !!user && user.userType === "brand",
  });

  // Creator recommendations disabled until endpoint is implemented
  // TODO: Implement POST /api/creator-recommendations endpoint
  const creatorRecommendations = null;

  // Fetch real trending data from TikTok API
  const { data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const response = await apiRequest("/api/trending");
      return await response.json();
    },
    enabled: !!user && user.userType === "brand",
  });

  // Enhanced brand analytics data - no hardcoded fallbacks in Phase 2
  const brandData = {
    totalSpend: profile?.totalSpend || 0,
    activeCampaigns: profile?.activeCampaigns || 0,
    avgROAS: profile?.avgROAS || 0,
    creatorsWorkedWith: profile?.creatorsWorkedWith || 0,
    totalReach: profile?.totalReach || 0,
    totalEngagement: profile?.totalEngagement || 0,
    conversionRate: profile?.conversionRate || 0,
    cpm: profile?.cpm || 0
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your brand dashboard...</p>
        </div>
      </div>
    );
  }

  // Use real campaign data only - no synthetic fallbacks in Phase 2
  const campaignData = campaignsData?.map(campaign => ({
    id: campaign.id,
    name: campaign.title || campaign.name || "Untitled Campaign",
    status: campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1) || "Draft", 
    budget: campaign.budget || 0,
    // Only include metrics if available from real campaign data
    ...(campaign.spent !== undefined && { spent: campaign.spent }),
    ...(campaign.creators !== undefined && { creators: campaign.creators }),
    ...(campaign.reach !== undefined && { reach: campaign.reach }),
    ...(campaign.engagement !== undefined && { engagement: campaign.engagement }),
    ...(campaign.roi !== undefined && { roi: campaign.roi }),
    ...(campaign.conversions !== undefined && { conversions: campaign.conversions }),
    progress: campaign.status === "completed" ? 100 : (campaign.progress || 0)
  })) || [];

  // Use real creator recommendations only - no synthetic data in Phase 2
  const topCreators = (creatorRecommendations?.recommendations?.slice(0, 4) || creatorsData?.slice(0, 4) || []).map((creator: any) => ({
    id: creator.id,
    name: `@${creator.username}`,
    avatar: "👤",
    followers: creator.followers,
    engagement: creator.engagementRate,
    niche: creator.contentCategories?.[0] || "General",
    pricePerPost: Number(creator.collaborationRate) || 0,
    avgViews: creator.avgViews,
    performance: creator.engagementRate > 7 ? "High" : "Good",
    availability: creator.availableForCollabs ? "Available" : "Busy"
  })) || [];

  // Use real analytics data only - no hardcoded fallbacks in Phase 2
  const performanceMetrics = analyticsData ? {
    impressions: analyticsData.totalImpressions,
    clicks: analyticsData.totalClicks,
    conversions: analyticsData.totalConversions,
    ctr: parseFloat(analyticsData.avgCTR),
    conversionRate: parseFloat(analyticsData.avgConversionRate),
    costPerClick: analyticsData.totalSpend / analyticsData.totalClicks,
    costPerConversion: parseFloat(analyticsData.avgCPM),
    roas: parseFloat(analyticsData.avgROAS)
  } : {
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    conversionRate: 0,
    costPerClick: 0,
    costPerConversion: 0,
    roas: 0
  };

  // Use real trending opportunities from TikTok API - no hardcoded data in Phase 2
  const trendingOpportunities = trendingData?.hashtags?.map(hashtag => ({
    trend: `#${hashtag.tag}`,
    posts: hashtag.posts,
    growth: hashtag.growth,
    audience: "TikTok Users",
    category: hashtag.category || "Trending"
  })) || [];

  const tabItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "campaigns", label: "Campaigns", icon: Target },
    { id: "creators", label: "Creator Discovery", icon: Search },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "opportunities", label: "Opportunities", icon: Sparkles },
    { id: "budget", label: "Budget", icon: DollarSign }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Paused":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Brand Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {user?.displayName || user?.username}! Manage campaigns and discover creators.</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Campaign</span>
              </button>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm border">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user?.displayName || user?.username}</p>
                  <p className="text-sm text-gray-500">Brand Account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      selectedTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spend</p>
                    <p className="text-3xl font-bold text-gray-900">${(brandData.totalSpend / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.2% this month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                    <p className="text-3xl font-bold text-gray-900">{brandData.activeCampaigns}</p>
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

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. ROAS</p>
                    <p className="text-3xl font-bold text-gray-900">{brandData.avgROAS}x</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.3x improvement</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reach</p>
                    <p className="text-3xl font-bold text-gray-900">{(brandData.totalReach / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Globe className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+22.8% growth</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Launch Campaign</h3>
                </div>
                <p className="text-purple-100 mb-4">Create targeted campaigns with AI-powered creator matching and budget optimization.</p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Start Campaign
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Search className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Discover Creators</h3>
                </div>
                <p className="text-blue-100 mb-4">Find top creators that align with your brand values and target the right audience.</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Browse Creators
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Performance Insights</h3>
                </div>
                <p className="text-green-100 mb-4">Track campaign performance, ROI metrics, and optimize for better results.</p>
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "campaigns" && (
          <div className="space-y-6">
            {/* Campaign Management Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Campaign</span>
                </button>
              </div>
            </div>

            {/* Campaign List */}
            <div className="space-y-4">
              {campaignData.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {campaign.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {campaign.status === "Active" && (
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                          <Pause className="h-4 w-4" />
                        </button>
                      )}
                      {campaign.status === "Paused" && (
                        <button className="p-2 text-green-600 hover:text-green-700 rounded">
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="text-lg font-semibold text-gray-900">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spent</p>
                      <p className="text-lg font-semibold text-gray-900">${campaign.spent.toLocaleString()}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Creators</p>
                      <p className="text-lg font-semibold text-gray-900">{campaign.creators}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reach</p>
                      <p className="text-lg font-semibold text-gray-900">{(campaign.reach / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ROI</p>
                      <p className="text-lg font-semibold text-green-600">{campaign.roi}x</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conversions</p>
                      <p className="text-lg font-semibold text-gray-900">{campaign.conversions.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Ends: {campaign.endDate}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{(campaign.reach / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{(campaign.engagement / 1000).toFixed(1)}K</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "creators" && (
          <div className="space-y-6">
            {/* Creator Discovery Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-gray-900">Creator Discovery</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search creators..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Creator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCreators.map((creator) => (
                <div key={creator.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{creator.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                        <p className="text-sm text-gray-600">{creator.niche}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{creator.rating}</span>
                          <span className="text-xs text-gray-500 ml-2">{creator.completionRate}% completion</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      creator.availability === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {creator.availability === "Available" ? "Available" : "Busy"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Followers</p>
                      <p className="font-semibold">{(creator.followers / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg. Views</p>
                      <p className="font-semibold">{(creator.avgViews / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Engagement</p>
                      <p className="font-semibold">{creator.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price/Post</p>
                      <p className="font-semibold">${creator.pricePerPost}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Audience</p>
                    <p className="text-sm text-gray-700">{creator.demographics.age}, {creator.demographics.gender}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded ${
                      creator.performance === "Exceptional" ? "bg-purple-100 text-purple-700" :
                      creator.performance === "High" ? "bg-green-100 text-green-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {creator.performance} Performance
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                        View Profile
                      </button>
                      <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "analytics" && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                    <p className="text-2xl font-bold text-gray-900">{(performanceMetrics.impressions / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">+12.5% vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Click-through Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{performanceMetrics.ctr}%</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <ThumbsUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">Above industry avg</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{performanceMetrics.conversionRate}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">+0.4% improvement</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cost per Conversion</p>
                    <p className="text-2xl font-bold text-gray-900">${performanceMetrics.costPerConversion}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">-8% cost reduction</span>
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Performance Breakdown</h3>
              <div className="space-y-4">
                {campaignData.filter(c => c.status === "Active").map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <span className="text-sm text-gray-500">{campaign.category}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Reach</p>
                        <p className="font-semibold">{(campaign.reach / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-semibold">{(campaign.engagement / 1000).toFixed(1)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Conversions</p>
                        <p className="font-semibold">{campaign.conversions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">ROI</p>
                        <p className="font-semibold text-green-600">{campaign.roi}x</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Budget Used</p>
                        <p className="font-semibold">{Math.round((campaign.spent / campaign.budget) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "opportunities" && (
          <div className="space-y-6">
            {/* Trending Opportunities */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Trending Content Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingOpportunities.map((opportunity, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-purple-600 text-lg">{opportunity.trend}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {opportunity.category}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Posts</span>
                        <span className="font-medium">{opportunity.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Growth</span>
                        <span className="font-medium text-green-600">{opportunity.growth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Target Audience</span>
                        <span className="font-medium">{opportunity.audience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Suggested Budget</span>
                        <span className="font-medium">{opportunity.suggestedBudget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Est. Reach</span>
                        <span className="font-medium">{opportunity.estimatedReach}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Create Campaign
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "budget" && (
          <div className="space-y-6">
            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Budget</p>
                    <p className="text-3xl font-bold text-gray-900">$25,000</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2 block">$17,000 spent (68%)</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Remaining Budget</p>
                    <p className="text-3xl font-bold text-gray-900">$8,000</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">12 days remaining</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Cost/Campaign</p>
                    <p className="text-3xl font-bold text-gray-900">$2,125</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">-12% vs last month</span>
                </div>
              </div>
            </div>

            {/* Budget Allocation */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget Allocation by Campaign</h3>
              <div className="space-y-4">
                {campaignData.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.category}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${campaign.budget.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">${campaign.spent.toLocaleString()} spent</p>
                      </div>
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-1 block">
                          {Math.round((campaign.spent / campaign.budget) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Brand;