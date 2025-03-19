"use client"
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { Star } from 'lucide-react'

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      date: "March 10, 2025",
      title: "Absolutely fantastic product!",
      comment: "I've been using this for a month now and it has exceeded all my expectations. The quality is outstanding and customer service was excellent.",
      helpful: 12
    },
    {
      id: 2,
      name: "Sam Wilson",
      rating: 4,
      date: "March 5, 2025",
      title: "Great value for money",
      comment: "Very pleased with my purchase. The only reason I'm not giving 5 stars is because shipping took a bit longer than expected.",
      helpful: 8
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
      helpful: 0
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Reviews</h1>
        
        {/* Product Summary
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
              <div>
                <h2 className="text-xl font-semibold">Premium Product</h2>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={`${
                        star <= 4.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.5 (42 reviews)</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold">$89.99</span>
            </div>
          </div>
        </div> */}
        
        {/* Review Form
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      star <= (hoveredStar || formData.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleRatingClick(star)}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select a rating'}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div> */}
        
        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
            <div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
          
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 py-6 last:border-0">
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
                  </div>
                  <h3 className="font-medium text-lg mt-2">{review.title}</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {review.date}
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-gray-800">{review.comment}</p>
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="text-sm text-gray-600 mr-6">
                  By {review.name}
                </div>
                <button 
                  onClick={() => handleHelpfulClick(review.id)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center">
              <button className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 bg-blue-50 text-blue-600">
                1
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100">
                Next
              </button>
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default ReviewPage