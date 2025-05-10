import { useState } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const PlaneIcon = getIcon("Plane");
  const BedIcon = getIcon("Bed");
  const CarIcon = getIcon("Car");
  const PackageIcon = getIcon("Package");
  const UserIcon = getIcon("UserCircle");
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    toast.info(`Viewing ${tab} trips`);
  };

  // Mock travel data
  const upcomingTrips = [
    {
      id: 1,
      destination: "Bali, Indonesia",
      startDate: "2024-06-15",
      endDate: "2024-06-25",
      type: "Flight + Hotel",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      destination: "Paris, France",
      startDate: "2024-08-10",
      endDate: "2024-08-18",
      type: "Flight + Hotel",
      status: "Pending Payment",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  const pastTrips = [
    {
      id: 3,
      destination: "Tokyo, Japan",
      startDate: "2023-11-05",
      endDate: "2023-11-15",
      type: "Flight + Hotel + Car",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      destination: "New York, USA",
      startDate: "2023-09-20",
      endDate: "2023-09-27",
      type: "Flight + Hotel",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      destination: "Barcelona, Spain",
      startDate: "2023-07-11",
      endDate: "2023-07-18",
      type: "Flight + Hotel",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Glassmorphism Header */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.4 
        }}></div>
        
        {/* Navbar */}
        <div className="relative z-10 container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PlaneIcon className="text-white" size={28} />
              <span className="text-white font-bold text-2xl">WanderWallet</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-surface-100 font-medium">Explore</a>
              <a href="#" className="text-white hover:text-surface-100 font-medium">Bookings</a>
              <a href="#" className="text-white hover:text-surface-100 font-medium">Destinations</a>
              <a href="#" className="text-white hover:text-surface-100 font-medium">Deals</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-primary dark:text-primary-light px-4 py-2 rounded-lg font-medium transition-all">
                <UserIcon className="inline mr-2" size={18} />
                My Profile
              </button>
              <button className="md:hidden text-white">
                <UserIcon size={24} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow mb-4">
            Your Travel Dashboard
          </h1>
          <p className="text-lg md:text-xl text-white text-shadow-sm max-w-2xl">
            Manage your bookings, track your upcoming trips, and discover new destinations all in one place.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
        {/* Travel Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card card-hover flex flex-col items-center justify-center p-6 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light mb-3">
              <PlaneIcon size={24} />
            </div>
            <span className="font-medium">Flights</span>
          </div>
          
          <div className="card card-hover flex flex-col items-center justify-center p-6 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light mb-3">
              <BedIcon size={24} />
            </div>
            <span className="font-medium">Hotels</span>
          </div>
          
          <div className="card card-hover flex flex-col items-center justify-center p-6 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 dark:bg-accent/20 text-accent mb-3">
              <CarIcon size={24} />
            </div>
            <span className="font-medium">Cars</span>
          </div>
          
          <div className="card card-hover flex flex-col items-center justify-center p-6 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-dark/10 dark:bg-primary-light/20 text-primary-dark dark:text-primary-light mb-3">
              <PackageIcon size={24} />
            </div>
            <span className="font-medium">Packages</span>
          </div>
        </div>
        
        {/* Main Feature Component */}
        <MainFeature />
        
        {/* Booking History */}
        <div className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Travel History</h2>
            <div className="flex bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
              <button 
                onClick={() => handleTabChange('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'upcoming' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => handleTabChange('past')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'past' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                Past Trips
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'upcoming' 
              ? upcomingTrips.map(trip => (
                <div key={trip.id} className="card card-hover overflow-hidden">
                  <div className="h-48 overflow-hidden -mx-6 -mt-6 mb-4 relative">
                    <img 
                      src={trip.image} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white dark:bg-surface-800 text-primary dark:text-primary-light text-xs font-semibold px-2 py-1 rounded-full">
                      {trip.status}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>
                  <div className="flex items-center gap-1 text-surface-500 dark:text-surface-400 mb-2">
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-surface-600 dark:text-surface-300 text-sm">
                    <PlaneIcon size={16} /> 
                    <span>{trip.type}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
                    <button className="text-primary dark:text-primary-light font-medium text-sm">View Details</button>
                    <button className="text-surface-500 dark:text-surface-400 text-sm">Manage Booking</button>
                  </div>
                </div>
              ))
              : pastTrips.map(trip => (
                <div key={trip.id} className="card card-hover overflow-hidden">
                  <div className="h-48 overflow-hidden -mx-6 -mt-6 mb-4 relative">
                    <img 
                      src={trip.image} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-white dark:bg-surface-800 text-green-600 dark:text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                      {trip.status}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>
                  <div className="flex items-center gap-1 text-surface-500 dark:text-surface-400 mb-2">
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-surface-600 dark:text-surface-300 text-sm">
                    <PlaneIcon size={16} /> 
                    <span>{trip.type}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
                    <button className="text-primary dark:text-primary-light font-medium text-sm">View Details</button>
                    <button className="text-primary dark:text-primary-light text-sm">Book Again</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-800 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PlaneIcon className="text-primary dark:text-primary-light" size={24} />
                <span className="text-primary dark:text-primary-light font-bold text-xl">WanderWallet</span>
              </div>
              <p className="text-surface-600 dark:text-surface-300 mb-4">
                Simplify your travel experiences with our all-in-one booking platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Destinations</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Flights</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Hotels</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Car Rentals</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">About Us</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Careers</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Blog</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Help Center</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Contact Us</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Privacy Policy</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 mt-8 pt-8 text-center text-surface-500 dark:text-surface-400">
            <p>© 2024 WanderWallet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}