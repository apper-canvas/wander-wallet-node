import getIcon from '../utils/iconUtils.jsx';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export default function MainFeature() {
  // Icon declarations
  const CalendarIcon = getIcon("Calendar");
  const MapPinIcon = getIcon("MapPin");
  const UsersIcon = getIcon("Users");
  const SearchIcon = getIcon("Search");
  const PlusIcon = getIcon("Plus");
  const MinusIcon = getIcon("Minus");
  const AdjustmentsIcon = getIcon("Settings2");
  const LoaderIcon = getIcon("Loader2");
  
  // Form state
  const [searchParams, setSearchParams] = useState({
    destination: '',
    dateRange: '',
    travelers: 2,
    mode: 'comprehensive' // comprehensive, relaxed, adventurous
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // Popular destinations
  const popularDestinations = [
    { id: 1, name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  // Handle traveler count
  const adjustTravelers = (amount) => {
    const newCount = searchParams.travelers + amount;
    if (newCount >= 1 && newCount <= 10) {
      setSearchParams({
        ...searchParams,
        travelers: newCount
      });
    }
  };
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validation
    if (!searchParams.destination) {
      toast.error("Please enter a destination");
      return;
    }
    
    if (!searchParams.dateRange) {
      toast.error("Please select travel dates");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      toast.success(`Planning your trip to ${searchParams.destination}!`);
    }, 1500);
  };
  
  // Toggle favorite destination
  const toggleFavorite = (destination) => {
    if (favorites.includes(destination.id)) {
      setFavorites(favorites.filter(id => id !== destination.id));
      toast.info(`Removed ${destination.name} from favorites`);
    } else {
      setFavorites([...favorites, destination.id]);
      toast.success(`Added ${destination.name} to favorites`);
    }
  };
  
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteDestinations');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteDestinations', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="relative">
      {/* Main Feature Card */}
      <div className="card p-6 md:p-8 lg:p-10 mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Plan Your Perfect Trip</h2>
        
        <form onSubmit={handleSearch} className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {/* Destination */}
          <div className="space-y-2">
            <label htmlFor="destination" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Where to?
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="text"
                id="destination"
                name="destination"
                value={searchParams.destination}
                onChange={handleInputChange}
                placeholder="City, country or region"
                className="form-input pl-10"
              />
            </div>
          </div>
          
          {/* Date Range */}
          <div className="space-y-2">
            <label htmlFor="dateRange" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              When?
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="text"
                id="dateRange"
                name="dateRange"
                value={searchParams.dateRange}
                onChange={handleInputChange}
                placeholder="Select dates"
                className="form-input pl-10"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>
          
          {/* Travelers */}
          <div className="space-y-2">
            <label htmlFor="travelers" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Travelers
            </label>
            <div className="relative flex items-center">
              <UsersIcon className="absolute left-3 text-surface-400" size={18} />
              <div className="form-input pl-10 flex items-center justify-between">
                <span>{searchParams.travelers} {searchParams.travelers === 1 ? 'person' : 'people'}</span>
                <div className="flex items-center space-x-2">
                  <button 
                    type="button" 
                    onClick={() => adjustTravelers(-1)}
                    className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                  >
                    <MinusIcon size={16} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => adjustTravelers(1)}
                    className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Travel Mode + Search Button */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                Trip Style
              </label>
              <button 
                type="button" 
                onClick={() => setShowFilters(!showFilters)}
                className="text-primary dark:text-primary-light text-sm flex items-center gap-1"
              >
                <AdjustmentsIcon size={14} />
                <span>{showFilters ? 'Hide' : 'More'} options</span>
              </button>
            </div>
            <div className="relative">
              <select
                id="mode"
                name="mode"
                value={searchParams.mode}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="comprehensive">All-inclusive</option>
                <option value="relaxed">Relaxation</option>
                <option value="adventurous">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="budget">Budget-friendly</option>
              </select>
            </div>
          </div>
          
          {/* Additional Filters */}
          {showFilters && (
            <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white dark:bg-surface-800 rounded-lg mt-4 border border-surface-200 dark:border-surface-700">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Budget Range
                </label>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-surface-500 mt-1">
                  <span>$100</span>
                  <span>$10,000+</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Accommodation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Hotels</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Resorts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Hostels</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Apartments</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Activities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Tours</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Outdoor</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Culinary</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                    <span className="text-sm">Wellness</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Search Button */}
          <div className={`${showFilters ? 'md:col-span-2 lg:col-span-4' : ''} flex justify-center md:justify-end mt-6 md:mt-0`}>
            <button
              type="submit"
              disabled={isSearching}
              className={`btn bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 transition-all ${showFilters ? 'w-full md:w-auto' : 'w-full'}`}
            >
              {isSearching ? (
                <>
                  <LoaderIcon className="animate-spin" size={18} />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <SearchIcon size={18} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Popular Destinations */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularDestinations.map((destination) => (
            <div 
              key={destination.id} 
              className="group relative h-48 rounded-xl overflow-hidden cursor-pointer card-hover"
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  destination: destination.name
                });
                toast.info(`Selected ${destination.name} as your destination`);
              }}
            >
              <img 
                src={destination.img} 
                alt={destination.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 flex justify-between items-end w-full">
                <h4 className="text-white font-semibold text-lg">{destination.name}</h4>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination);
                  }} 
                  className={`p-2 rounded-full ${
                    favorites.includes(destination.id) 
                      ? 'bg-accent/80 text-white' 
                      : 'bg-white/80 text-surface-600'
                  }`}
                >
                  {favorites.includes(destination.id) 
                    ? getIcon("Heart")({size: 18}) 
                    : getIcon("HeartIcon")({size: 18})}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Travel Inspiration */}
      <div className="bg-surface-100 dark:bg-surface-800 rounded-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Travel Inspiration</h3>
          <a href="#" className="text-primary dark:text-primary-light font-medium text-sm">View all</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-medium text-primary dark:text-primary-light bg-primary/10 dark:bg-primary-dark/20 px-2 py-1 rounded-full">Beach Getaways</span>
            <h4 className="font-semibold text-lg">Top 10 Beach Destinations for 2024</h4>
            <p className="text-surface-600 dark:text-surface-300 text-sm">Discover pristine shores and crystal-clear waters at these stunning beach destinations.</p>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-medium text-secondary dark:text-secondary-light bg-secondary/10 dark:bg-secondary-dark/20 px-2 py-1 rounded-full">City Breaks</span>
            <h4 className="font-semibold text-lg">Hidden Gems in Major European Cities</h4>
            <p className="text-surface-600 dark:text-surface-300 text-sm">Explore the lesser-known attractions and local favorites in Europe's most beloved cities.</p>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">Adventure</span>
            <h4 className="font-semibold text-lg">Ultimate Adventure Travel Guide</h4>
            <p className="text-surface-600 dark:text-surface-300 text-sm">From trekking in Nepal to diving in the Great Barrier Reef, find your next adrenaline rush.</p>
          </div>
        </div>
      </div>
    </div>
  );
}