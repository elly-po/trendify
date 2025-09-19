import { TrendingUp, Eye, Heart, Share, Users, Calendar, Target, DollarSign, BarChart3, Settings, Loader2, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";

function Creator() {
  const { user } = useAuth();
  
  // Fetch user profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const response = await apiRequest("/api/profile");
      return response.json();
    },
    enabled: !!user,
  });

  // Use real data from profile, fallback to defaults for new users
  const stats = {
    followers: profile?.followerCount ? `${(profile.followerCount / 1000).toFixed(1)}K` : "0",
    avgViews: profile?.averageViews ? `${(profile.averageViews / 1000).toFixed(1)}K` : "0",
    engagementRate: profile?.engagementRate ? `${profile.engagementRate}%` : "0%",
    monthlyEarnings: profile?.monthlyEarnings ? `$${profile.monthlyEarnings.toLocaleString()}` : "$0"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const recentVideos = [
    {
      id: 1,
      title: "Morning Routine Tips",
      views: "89.2K",
      likes: "12.4K",
      shares: "1.2K",
      posted: "2 days ago",
      thumbnail: "🌅"
    },
    {
      id: 2,
      title: "Productivity Hacks",
      views: "156.7K",
      likes: "23.1K",
      shares: "3.4K",
      posted: "5 days ago",
      thumbnail: "⚡"
    },
    {
      id: 3,
      title: "Healthy Snack Ideas",
      views: "73.8K",
      likes: "9.8K",
      shares: "892",
      posted: "1 week ago",
      thumbnail: "🥗"
    }
  ];

  const opportunities = [
    {
      brand: "FitLife Supplements",
      campaign: "Wellness Challenge",
      payment: "$750",
      deadline: "Dec 15, 2024",
      type: "Sponsored Post"
    },
    {
      brand: "TechGadgets Co",
      campaign: "Holiday Tech Review",
      payment: "$1,200",
      deadline: "Dec 20, 2024",
      type: "Product Review"
    },
    {
      brand: "StyleHub Fashion",
      campaign: "Winter Collection",
      payment: "$950",
      deadline: "Jan 5, 2025",
      type: "Fashion Haul"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-gray-600">Manage your content, track performance, and discover new opportunities</p>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.userType} Account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Followers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.followers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12.5% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgViews}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8.3% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.engagementRate}</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+2.1% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlyEarnings}</p>
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Videos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Videos</h2>
                <button className="text-purple-600 hover:text-purple-700 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-3xl">{video.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{video.title}</h3>
                      <p className="text-sm text-gray-500">{video.posted}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="h-4 w-4 mr-1" />
                        {video.views}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Heart className="h-4 w-4 mr-1" />
                        {video.likes}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Share className="h-4 w-4 mr-1" />
                        {video.shares}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-6">
            {/* Tools */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Creator Tools</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-700">Analytics Deep Dive</span>
                </button>
                <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Target className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-700">Trend Discovery</span>
                </button>
                <button className="w-full flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Calendar className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-700">Content Scheduler</span>
                </button>
                <button className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-700">Profile Settings</span>
                </button>
              </div>
            </div>

            {/* Campaign Opportunities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Brand Opportunities</h2>
              <div className="space-y-4">
                {opportunities.slice(0, 2).map((opportunity, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{opportunity.brand}</h3>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{opportunity.payment}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{opportunity.campaign}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{opportunity.type}</span>
                      <span>Due: {opportunity.deadline}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full text-center py-2 text-purple-600 hover:text-purple-700 font-medium">
                  View All Opportunities
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Boost Your Reach</h3>
            <p className="text-purple-100 mb-4">Discover trending hashtags and optimal posting times for maximum engagement.</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Get Insights
            </button>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Monetize Better</h3>
            <p className="text-pink-100 mb-4">Connect with brands looking for creators in your niche and increase your earnings.</p>
            <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Find Brands
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Track Performance</h3>
            <p className="text-blue-100 mb-4">Get detailed analytics on your content performance and audience insights.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creator;