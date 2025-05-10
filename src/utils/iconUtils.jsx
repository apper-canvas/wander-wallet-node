import * as Icons from 'lucide-react';

export default function getIcon(iconName) {
  const IconComponent = Icons[iconName] || Icons.Smile;
  
  // Return a function that accepts props and renders the icon
  return (props) => {
    return <IconComponent {...props} />;
  };
}