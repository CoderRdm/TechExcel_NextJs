"use client"
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { Star, ThumbsUp, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      date: "March 10, 2025",
      title: "Absolutely fantastic product!",
      comment: "I've been using this for a month now and it has exceeded all my expectations. The quality is outstanding and customer service was excellent.",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      name: "Sam Wilson",
      rating: 4,
      date: "March 5, 2025",
      title: "Great value for money",
      comment: "Very pleased with my purchase. The only reason I'm not giving 5 stars is because shipping took a bit longer than expected.",
      helpful: 8,
      verified: true
    }
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: ''
  });
  
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new review
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      rating: formData.rating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: formData.title,
      comment: formData.comment,
      helpful: 0,
      verified: true
    };
    
    // Add to reviews
    setReviews(prev => [newReview, ...prev]);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      rating: 0,
      title: '',
      comment: ''
    });
    
    // Show success message (in a real app)
    alert("Thank you for your review!");
  };
  
  const handleHelpfulClick = (id) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === id ? {...review, helpful: review.helpful + 1} : review
      )
    );
  };

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-lime-500 to-yellow-500">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 p-10">Product Reviews</h1>
        
        {/* Reviews Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-50 p-4 rounded-xl mr-4">
                <span className="text-4xl font-bold text-blue-600">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-blue-600">/5</span>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={22}
                      className={`${
                        star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on {reviews.length} reviews</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search reviews..."
                  className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
          
          {/* Rating distribution */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              
              return (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center mr-2">
                    <span className="text-sm text-gray-700 mr-1">{rating}</span>
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{count}</span>
                </div>
              );
            })}
          </div>
          
          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={`${
                            star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      {review.verified && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mt-2 text-gray-800">{review.title}</h3>
                  </div>
                  <div className="text-sm text-gray-500">
                    {review.date}
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
                
                <div className="mt-4 flex items-center">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mr-6">
                    <img 
                      src="/api/placeholder/24/24" 
                      alt="User Avatar" 
                      className="w-6 h-6 rounded-full"
                    />
                    <span>By {review.name}</span>
                  </div>
                  <button 
                    onClick={() => handleHelpfulClick(review.id)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full flex items-center transition-colors"
                  >
                    <ThumbsUp size={14} className="mr-1" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft size={18} className="mr-1" />
                <span>Previous</span>
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-medium">
                1
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 hover:bg-gray-100 transition-colors">
                3
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors">
                <span>Next</span>
                <ChevronRight size={18} className="ml-1" />
              </button>
            </nav>
          </div>
        </div>
        
        {/* Write Review CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Share Your Experience</h2>
          <p className="text-blue-100 mb-6">Help others make better decisions by sharing your honest feedback.</p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-md">
            Write a Review
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default ReviewPage