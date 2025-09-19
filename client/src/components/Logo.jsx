import React from 'react';
import { Flower } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Flower className="w-8 h-8 text-primary" />
        <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full blur-md"></div>
      </div>
      <div className="font-bold text-xl text-foreground tracking-tight">
        Ayur<span className="text-primary">Sutra</span>
      </div>
    </div>
  );
};

export default Logo;
