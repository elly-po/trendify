const TestimonialsSkeleton = () => {
  return (
    <div className="bg-white py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-md w-1/2 mx-auto mb-8"></div>
        </div>

        <div className="mt-10">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="p-4">
              <div className="h-24 bg-gray-100 rounded-md mb-4"></div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-16"></div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="h-24 bg-gray-100 rounded-md mb-4"></div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSkeleton;