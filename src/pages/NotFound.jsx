import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  const HomeIcon = getIcon("Home");
  const MapIcon = getIcon("Map");
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="mb-8 text-primary dark:text-primary-light">
          <MapIcon size={72} className="mx-auto" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Destination Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 text-lg mb-8">
          Looks like you've wandered off the map! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn-primary flex items-center justify-center gap-2"
          >
            <HomeIcon size={18} />
            <span>Return Home</span>
          </Link>
          
          <a 
            href="#" 
            className="btn-outline flex items-center justify-center gap-2"
          >
            <span>Contact Support</span>
          </a>
        </div>
        
        <div className="mt-12 p-6 bg-surface-100 dark:bg-surface-800 rounded-xl">
          <h3 className="font-semibold text-lg mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/" className="text-primary dark:text-primary-light hover:underline">Home</Link>
            <Link to="/" className="text-primary dark:text-primary-light hover:underline">Explore</Link>
            <Link to="/" className="text-primary dark:text-primary-light hover:underline">Bookings</Link>
            <Link to="/" className="text-primary dark:text-primary-light hover:underline">Deals</Link>
          </div>
        </div>
      </div>
    </div>
  );
}