import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { User, LogOut } from "lucide-react";

function Header() {
  const { user, logoutMutation } = useAuth();
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TrendifyGo</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/creator" className="text-gray-600 hover:text-gray-900 transition-colors">
              For Creators
            </Link>
            <Link to="/brand" className="text-gray-600 hover:text-gray-900 transition-colors">
              For Brands
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to={user.userType === "creator" ? "/creator" : "/brand"}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2 text-gray-700">
                  <span className="text-sm">Hi, {user.username}</span>
                </div>
                <button 
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;