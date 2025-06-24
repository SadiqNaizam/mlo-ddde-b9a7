import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, User, Library } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 font-body text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-8 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">
              Bibliotheca
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center px-4 lg:px-16">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for books, authors, or genres..."
              className="w-full rounded-full pl-10 font-body bg-secondary/50 focus:bg-secondary"
            />
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink to="/library" className={navLinkClasses}>
            <Library className="h-5 w-5" />
            <span className="hidden md:inline">My Library</span>
          </NavLink>
          <NavLink to="/account" className={navLinkClasses}>
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Account</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;