import { 
  TrendingUp, Eye, Heart, Share, Users, Calendar, Target, DollarSign, BarChart3, 
  Loader2, User, Clock, Hash, Award, Video, 
  ThumbsUp, MessageCircle, Star, Filter, ChevronRight,
  Zap, Globe, Sparkles, ChevronDown, Search, Check, X
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useState } from "react";

// TikTok Connection Form Component
function TikTokConnectionForm({ profile, onConnectionUpdate }: { profile: any, onConnectionUpdate: () => void }) {
  const [tiktokUsername, setTiktokUsername] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(!profile?.tiktokUsername);

  const handleConnect = async () => {
    if (!tiktokUsername.trim()) {
      setError("Please enter your TikTok username");
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/creator/connect-tiktok", {
        tiktokUsername: tiktokUsername.replace("@", "") // Remove @ if user adds it
      });

      if (response.ok) {
        onConnectionUpdate();
        setShowForm(false);
        setTiktokUsername("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to connect TikTok account");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  if (profile?.tiktokUsername && !showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Update Connection
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter TikTok username"
            value={tiktokUsername}
            onChange={(e) => setTiktokUsername(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isConnecting}
          />
          <button
            onClick={handleConnect}
            disabled={isConnecting || !tiktokUsername.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors flex items-center space-x-2"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Connect</span>
              </>
            )}
          </button>
          {showForm && profile?.tiktokUsername && (
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-600 text-xs">{error}</p>
        )}
      </div>
    </div>
  );
}

function Creator() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  
  // Fetch user profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/profile");
      return await response.json();
    },
    enabled: !!user,
  });

  // Fetch real creator analytics
  const { data: creatorAnalytics } = useQuery({
    queryKey: ["creator-analytics", user?.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/creator-analytics/${user?.id}`);
      return await response.json();
    },
    enabled: !!user && user.userType === "creator",
  });

  // Fetch trending data
  const { data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/trending");
      return await response.json();
    },
    enabled: !!user,
  });

  // Fetch brand opportunities for creators
  const { data: brandOpportunities } = useQuery({
    queryKey: ["brand-opportunities", user?.id],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/brand-opportunities");
      return await response.json();
    },
    enabled: !!user && user.userType === "creator",
  });

  // Use real TikTok analytics data only - no hardcoded fallbacks in Phase 2
  const analyticsData = {
    totalViews: creatorAnalytics?.performance?.avgViews * (creatorAnalytics?.profile?.videoCount || 1) || 0,
    totalFollowers: creatorAnalytics?.profile?.followers || 0,
    engagementRate: creatorAnalytics?.profile?.engagementRate || 0,
    avgViews: creatorAnalytics?.performance?.avgViews || 0,
    monthlyEarnings: creatorAnalytics?.earnings?.estimatedMonthly || 0,
    weeklyGrowth: creatorAnalytics?.growth?.followerGrowth || 0,
    videoCount: creatorAnalytics?.profile?.videoCount || 0,
    totalLikes: creatorAnalytics?.profile?.totalLikes || 0,
    isVerified: creatorAnalytics?.profile?.isVerified || false,
    avgLikes: creatorAnalytics?.performance?.avgLikes || 0,
    avgShares: creatorAnalytics?.performance?.avgShares || 0,
    avgComments: creatorAnalytics?.performance?.avgComments || 0
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your creator dashboard...</p>
        </div>
      </div>
    );
  }

  // Use real TikTok trending data only - no fallbacks in Phase 2
  const trendingHashtags = trendingData?.hashtags?.slice(0, 5) || [];

  // Use real recent videos from creator analytics - no mock data in Phase 2
  const viralContent = creatorAnalytics?.recentVideos?.slice(0, 3).map((video, index) => ({
    id: index + 1,
    title: `Video ${index + 1}`,
    creator: `@${user?.username}`,
    views: `${Math.floor(video.view_count / 1000)}K`,
    engagement: `${video.engagement_rate.toFixed(1)}%`,
    category: video.hashtags?.[0] || "General",
    viralScore: Math.floor(video.engagement_rate * 10 + (video.view_count / 10000))
  })) || [];

  // Use real recent videos from creator analytics - no mock data in Phase 2
  const contentPerformance = creatorAnalytics?.recentVideos?.map((video, index) => ({
    id: index + 1,
    title: `Video ${index + 1}`,
    thumbnail: video.hashtags?.[0] ? `#${video.hashtags[0]}` : "📹",
    views: `${Math.floor(video.view_count / 1000)}K`,
    likes: `${Math.floor(video.like_count / 1000)}K`,
    comments: `${video.comment_count}`,
    shares: `${video.share_count}`,
    posted: new Date(video.create_time).toLocaleDateString(),
    engagement: `${video.engagement_rate.toFixed(1)}%`,
    predicted: video.engagement_rate > 5 ? "High viral potential" : "Growing steadily"
  })) || [];

  // Use real brand opportunities from API - no mock data in Phase 2  
  const campaignOpportunities = brandOpportunities?.opportunities || [];

  // Use real audience insights from creator analytics - no hardcoded data in Phase 2
  const audienceInsights = creatorAnalytics?.audienceInsights || {
    demographics: [],
    topLocations: [],
    peakHours: []
  };

  const tabItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "content", label: "Content", icon: Video },
    { id: "trends", label: "Trends", icon: Hash },
    { id: "campaigns", label: "Campaigns", icon: Target },
    { id: "audience", label: "Audience", icon: Users },
    { id: "earnings", label: "Earnings", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Creator Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {user?.displayName || user?.username}! Track your growth and manage your content.</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm border">
                <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user?.displayName || user?.username}</p>
                  <p className="text-sm text-gray-500">Creator Account</p>
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
            {/* TikTok Connection Status */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">tt</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">TikTok Account Connection</h3>
                    {profile?.tiktokUsername ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">Connected: @{profile.tiktokUsername}</span>
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                    ) : (
                      <p className="text-amber-600">Connect your TikTok account to see real analytics</p>
                    )}
                  </div>
                </div>
                <TikTokConnectionForm profile={profile} onConnectionUpdate={() => {
                  // Refresh profile data to show connection status immediately
                  window.location.reload();
                }} />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Followers</p>
                    <p className="text-3xl font-bold text-gray-900">{(analyticsData.totalFollowers / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analyticsData.weeklyGrowth}% this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">{(analyticsData.totalViews / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.3% this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{analyticsData.engagementRate}%</p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.1% this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                    <p className="text-3xl font-bold text-gray-900">${analyticsData.monthlyEarnings.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+18.7% this month</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">AI Content Ideas</h3>
                </div>
                <p className="text-purple-100 mb-4">Get personalized content suggestions based on trending topics in your niche.</p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Generate Ideas
                </button>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Brand Partnerships</h3>
                </div>
                <p className="text-pink-100 mb-4">Discover high-paying brand campaigns that match your content style and audience.</p>
                <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Browse Campaigns
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Trend Analysis</h3>
                </div>
                <p className="text-blue-100 mb-4">Stay ahead with real-time trend monitoring and viral content predictions.</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View Trends
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "content" && (
          <div className="space-y-6">
            {/* Content Performance Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Content Performance</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <div className="space-y-4">
                  {contentPerformance.map((content) => (
                    <div key={content.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-4xl">{content.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{content.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{content.posted}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {content.views}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {content.likes}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {content.comments}
                          </div>
                          <div className="flex items-center">
                            <Share className="h-4 w-4 mr-1" />
                            {content.shares}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900 mb-1">{content.engagement}</div>
                        <div className="text-sm text-gray-600 mb-2">Engagement Rate</div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          content.predicted.includes('High') ? 'bg-green-100 text-green-700' :
                          content.predicted.includes('Peak') ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {content.predicted}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "trends" && (
          <div className="space-y-6">
            {/* Trending Hashtags */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Trending Hashtags</h2>
                  <span className="text-sm text-gray-500">Updated 5 minutes ago</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingHashtags.map((hashtag, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-purple-600">{hashtag.tag}</span>
                        {hashtag.trending && <Zap className="h-4 w-4 text-orange-500" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{hashtag.posts} posts</p>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">{hashtag.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Viral Content Analysis */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Viral Content Analysis</h2>
                <div className="space-y-4">
                  {viralContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{content.title}</h3>
                        <p className="text-sm text-gray-600">by {content.creator}</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{content.views}</p>
                          <p className="text-xs text-gray-500">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{content.engagement}</p>
                          <p className="text-xs text-gray-500">Engagement</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-purple-600">{content.viralScore}</span>
                            <Star className="h-4 w-4 text-purple-600 ml-1" />
                          </div>
                          <p className="text-xs text-gray-500">Viral Score</p>
                        </div>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {content.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "campaigns" && (
          <div className="space-y-6">
            {/* Campaign Opportunities */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Brand Partnership Opportunities</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Sorted by match score</span>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {(brandOpportunities?.opportunities || campaignOpportunities).map((campaign, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{campaign.brandName || campaign.brand}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                              {campaign.budget || campaign.payment}
                            </span>
                            <div className="flex items-center">
                              <span className="text-sm text-purple-600 font-medium">{campaign.matchScore}% match</span>
                              <Star className="h-4 w-4 text-purple-600 ml-1" />
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{campaign.campaignTitle || campaign.campaign}</p>
                          <p className="text-sm text-gray-600 mb-3">{campaign.description || campaign.requirements}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {campaign.deadline}
                            </span>
                            <span className="flex items-center">
                              <Target className="h-4 w-4 mr-1" />
                              {campaign.type}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {campaign.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Apply Now
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Learn More
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">Expires in 3 days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "audience" && (
          <div className="space-y-6">
            {/* Audience Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Age Demographics</h2>
                  <div className="space-y-4">
                    {audienceInsights.demographics.map((demo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900">{demo.age}</span>
                          <span className="text-sm text-gray-500">{demo.gender}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${demo.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{demo.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Locations</h2>
                  <div className="space-y-4">
                    {audienceInsights.topLocations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{location.country}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{location.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Times */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Peak Engagement Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {audienceInsights.peakHours.map((peak, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg text-center">
                      <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900 mb-1">{peak.time}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        peak.engagement === 'Very High' ? 'bg-green-100 text-green-700' :
                        peak.engagement === 'High' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {peak.engagement} Engagement
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "earnings" && (
          <div className="space-y-6">
            {/* Earnings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-3xl font-bold text-gray-900">${analyticsData.monthlyEarnings.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+18.7% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                    <p className="text-3xl font-bold text-gray-900">$1,847</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">Processing 3 payments</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earned</p>
                    <p className="text-3xl font-bold text-gray-900">$28,943</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">Lifetime earnings</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {[
                    { brand: "FitLife Supplements", amount: "$750", date: "Dec 15, 2024", status: "Completed" },
                    { brand: "TechGadgets Co", amount: "$1,200", date: "Dec 12, 2024", status: "Pending" },
                    { brand: "StyleHub Fashion", amount: "$950", date: "Dec 8, 2024", status: "Completed" },
                    { brand: "HealthyEats", amount: "$625", date: "Dec 5, 2024", status: "Completed" }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.brand}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold text-gray-900">{transaction.amount}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Creator;