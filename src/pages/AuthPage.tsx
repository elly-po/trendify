// Authentication page for TrendifyGo - login and signup forms
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Loader2, UserPlus, LogIn, Users, BarChart3, Zap } from "lucide-react";

function AuthPage() {
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "creator" as "creator" | "brand",
    displayName: "",
    bio: "",
    // Creator fields
    tiktokUsername: "",
    contentCategories: [] as string[],
    // Brand fields  
    companyName: "",
    industry: "",
    website: "",
  });

  // Redirect to appropriate dashboard if already logged in
  if (user) {
    return <Redirect to={user.userType === "creator" ? "/creator" : "/brand"} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔥 Form submitted!", { isLogin, username: formData.username });
    
    if (isLogin) {
      loginMutation.mutate({
        username: formData.username,
        password: formData.password,
      });
    } else {
      registerMutation.mutate({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        displayName: formData.displayName || formData.username,
        bio: formData.bio,
        tiktokUsername: formData.tiktokUsername,
        companyName: formData.companyName || formData.displayName,
        industry: formData.industry,
        website: formData.website,
        contentCategories: formData.contentCategories,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Welcome Back!" : "Join TrendifyGo"}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? "Sign in to your account to continue" 
                : "Create your account and start growing"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Form Toggle */}
            <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLogin 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LogIn className="h-4 w-4 inline mr-2" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLogin 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserPlus className="h-4 w-4 inline mr-2" />
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              {/* Registration-only fields */}
              {!isLogin && (
                <>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* User Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      I am a...
                    </label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="creator">TikTok Creator</option>
                      <option value="brand">Brand/Business</option>
                    </select>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.userType === "creator" ? "Display Name" : "Company/Brand Name"}
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      required
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={formData.userType === "creator" ? "Your display name" : "Your company name"}
                    />
                  </div>

                  {/* Creator-specific fields */}
                  {formData.userType === "creator" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        TikTok Username (optional)
                      </label>
                      <input
                        type="text"
                        name="tiktokUsername"
                        value={formData.tiktokUsername}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="@yourusername"
                      />
                    </div>
                  )}

                  {/* Brand-specific fields */}
                  {formData.userType === "brand" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry (optional)
                        </label>
                        <input
                          type="text"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Fashion, Tech, Food"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website (optional)
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  minLength={6}
                />
                {!isLogin && (
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => console.log("🚀 Submit button clicked!", { isSubmitting, isLogin })}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <p className="text-center text-sm text-gray-600 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-medium hover:text-purple-700"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center p-8">
        <div className="text-white text-center max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">
              TrendifyGo
            </h2>
            <p className="text-xl text-purple-100">
              The ultimate TikTok marketing platform for creators and brands
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-purple-100">
              <BarChart3 className="h-8 w-8 text-white" />
              <div className="text-left">
                <h3 className="font-semibold text-white">Real-time Analytics</h3>
                <p className="text-sm">Track performance with live data</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-purple-100">
              <Users className="h-8 w-8 text-white" />
              <div className="text-left">
                <h3 className="font-semibold text-white">Smart Matching</h3>
                <p className="text-sm">Connect with perfect partners</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-purple-100">
              <Zap className="h-8 w-8 text-white" />
              <div className="text-left">
                <h3 className="font-semibold text-white">Campaign Automation</h3>
                <p className="text-sm">Streamline your marketing efforts</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-purple-100">
              Join <span className="font-bold text-white">25,000+</span> creators and brands already growing with TrendifyGo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;