import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils.jsx';

export default function Flights() {
  // Icon declarations
  const PlaneIcon = getIcon("Plane");
  const PlaneUpIcon = getIcon("PlaneTakeoff");
  const PlaneLandIcon = getIcon("PlaneLanding");
  const CalendarIcon = getIcon("Calendar");
  const UsersIcon = getIcon("Users");
  const SearchIcon = getIcon("Search");
  const PlusIcon = getIcon("Plus");
  const MinusIcon = getIcon("Minus");
  const ArrowLeftIcon = getIcon("ArrowLeft");
  const FilterIcon = getIcon("Filter");
  const LoaderIcon = getIcon("Loader2");

  // Form state
  const [flightSearch, setFlightSearch] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
    tripType: 'roundTrip'
  });

  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightSearch({
      ...flightSearch,
      [name]: value
    });
  };

  // Handle passenger count
  const adjustPassengers = (amount) => {
    const newCount = flightSearch.passengers + amount;
    if (newCount >= 1 && newCount <= 9) {
      setFlightSearch({
        ...flightSearch,
        passengers: newCount
      });
    }
  };

  // Handle trip type change
  const handleTripTypeChange = (type) => {
    setFlightSearch({
      ...flightSearch,
      tripType: type
    });
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validation
    if (!flightSearch.origin) {
      toast.error("Please enter an origin city");
      return;
    }
    
    if (!flightSearch.destination) {
      toast.error("Please enter a destination city");
      return;
    }
    
    if (!flightSearch.departDate) {
      toast.error("Please select a departure date");
      return;
    }
    
    if (flightSearch.tripType === 'roundTrip' && !flightSearch.returnDate) {
      toast.error("Please select a return date");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      
      // Mock results
      setSearchResults([
        {
          id: 1,
          airline: "SkyJet Airways",
          origin: flightSearch.origin,
          destination: flightSearch.destination,
          departTime: "06:30",
          arriveTime: "08:45",
          duration: "2h 15m",
          stops: 0,
          price: 299,
          class: flightSearch.class
        },
        {
          id: 2,
          airline: "GlobalAir",
          origin: flightSearch.origin,
          destination: flightSearch.destination,
          departTime: "10:15",
          arriveTime: "12:55",
          duration: "2h 40m",
          stops: 1,
          stopLocation: "Frankfurt",
          price: 249,
          class: flightSearch.class
        },
        {
          id: 3,
          airline: "OceanicFlights",
          origin: flightSearch.origin,
          destination: flightSearch.destination,
          departTime: "14:20",
          arriveTime: "16:50",
          duration: "2h 30m",
          stops: 0,
          price: 329,
          class: flightSearch.class
        }
      ]);
      
      toast.success(`Found ${3} flights from ${flightSearch.origin} to ${flightSearch.destination}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Header */}
      <div className="bg-primary dark:bg-primary-dark py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 text-white">
              <ArrowLeftIcon size={20} />
              <span>Back to home</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Find Your Flight</h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        {/* Search Form */}
        <div className="card p-6 md:p-8 mb-8 bg-white dark:bg-surface-800">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Trip Type Selection */}
            <div className="flex space-x-4 mb-4">
              <button 
                type="button"
                onClick={() => handleTripTypeChange('roundTrip')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  flightSearch.tripType === 'roundTrip' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                }`}
              >
                Round Trip
              </button>
              <button 
                type="button"
                onClick={() => handleTripTypeChange('oneWay')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  flightSearch.tripType === 'oneWay' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                }`}
              >
                One Way
              </button>
              <button 
                type="button"
                onClick={() => handleTripTypeChange('multiCity')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  flightSearch.tripType === 'multiCity' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                }`}
              >
                Multi-City
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Origin */}
              <div className="space-y-2">
                <label htmlFor="origin" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  From
                </label>
                <div className="relative">
                  <PlaneUpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={flightSearch.origin}
                    onChange={handleInputChange}
                    placeholder="City or airport"
                    className="form-input pl-10"
                  />
                </div>
              </div>
              
              {/* Destination */}
              <div className="space-y-2">
                <label htmlFor="destination" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  To
                </label>
                <div className="relative">
                  <PlaneLandIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={flightSearch.destination}
                    onChange={handleInputChange}
                    placeholder="City or airport"
                    className="form-input pl-10"
                  />
                </div>
              </div>
              
              {/* Depart Date */}
              <div className="space-y-2">
                <label htmlFor="departDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Depart
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type="date"
                    id="departDate"
                    name="departDate"
                    value={flightSearch.departDate}
                    onChange={handleInputChange}
                    className="form-input pl-10"
                  />
                </div>
              </div>
              
              {/* Return Date */}
              <div className="space-y-2">
                <label htmlFor="returnDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Return
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={flightSearch.returnDate}
                    onChange={handleInputChange}
                    disabled={flightSearch.tripType === 'oneWay'}
                    className={`form-input pl-10 ${flightSearch.tripType === 'oneWay' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Passengers */}
              <div className="space-y-2">
                <label htmlFor="passengers" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Passengers
                </label>
                <div className="relative flex items-center">
                  <UsersIcon className="absolute left-3 text-surface-400" size={18} />
                  <div className="form-input pl-10 flex items-center justify-between">
                    <span>{flightSearch.passengers} {flightSearch.passengers === 1 ? 'passenger' : 'passengers'}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        type="button" 
                        onClick={() => adjustPassengers(-1)}
                        className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                      >
                        <MinusIcon size={16} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => adjustPassengers(1)}
                        className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                      >
                        <PlusIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Class */}
              <div className="space-y-2">
                <label htmlFor="class" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Class
                </label>
                <div className="relative">
                  <select
                    id="class"
                    name="class"
                    value={flightSearch.class}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
              
              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="btn bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 transition-all w-full justify-center"
                >
                  {isSearching ? (
                    <>
                      <LoaderIcon className="animate-spin" size={18} />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <SearchIcon size={18} />
                      <span>Search Flights</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Additional Filters Button */}
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setShowFilters(!showFilters)}
                className="text-primary dark:text-primary-light text-sm flex items-center gap-1"
              >
                <FilterIcon size={16} />
                <span>{showFilters ? 'Hide' : 'Show'} filters</span>
              </button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Price Range
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="2000" 
                      step="50" 
                      className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-surface-500 mt-1">
                      <span>$50</span>
                      <span>$2,000+</span>
                    </div>
                  </div>
                  
                  {/* Airlines */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Airlines
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">SkyJet Airways</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">GlobalAir</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">OceanicFlights</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">SunExpress</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Stops */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Stops
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">Non-stop only</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">1 stop max</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm text-primary focus:ring-primary" />
                        <span className="text-sm">Any number of stops</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Search Results */}
        {hasSearched && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Flight Search Results</h2>
            
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((flight) => (
                  <div key={flight.id} className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Airline */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <PlaneIcon className="text-primary" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold">{flight.airline}</div>
                            <div className="text-sm text-surface-500">{flight.class === 'economy' ? 'Economy' : flight.class === 'premium' ? 'Premium Economy' : flight.class === 'business' ? 'Business' : 'First Class'}</div>
                          </div>
                        </div>
                        
                        {/* Flight Details */}
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.departTime}</div>
                            <div className="text-sm text-surface-500">{flight.origin}</div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-surface-500">{flight.duration}</div>
                            <div className="relative w-24 md:w-32">
                              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-300 dark:bg-surface-600"></div>
                              {flight.stops > 0 && (
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-surface-300 dark:bg-surface-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                              )}
                            </div>
                            {flight.stops > 0 && (
                              <div className="text-xs text-surface-500">{flight.stops} stop ({flight.stopLocation})</div>
                            )}
                            {flight.stops === 0 && (
                              <div className="text-xs text-green-600">Direct</div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.arriveTime}</div>
                            <div className="text-sm text-surface-500">{flight.destination}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price and Book */}
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-primary">${flight.price}</div>
                        <button className="btn-primary mt-2">Select</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface-100 dark:bg-surface-800 p-8 rounded-lg text-center">
                <PlaneIcon className="mx-auto mb-4 text-surface-400" size={48} />
                <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  Try adjusting your search criteria to find more results.
                </p>
                <button onClick={() => setShowFilters(true)} className="btn-outline">
                  Adjust Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}