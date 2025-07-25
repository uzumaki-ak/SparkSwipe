
import { useState } from 'react';
import StartupCard from '@/components/feed/StartupCard';
// import BottomNavigation from '@/components/navigation/BottomNavigation';
import { motion } from 'framer-motion';
import FeedTopBar from '@/components/feed/FeedTopBar';
import Navigation from '@/components/Navigation';
import FeedFilters from '@/components/feed/FeedFilters';

// Mock data for startup ideas
const mockStartups = [
  {
    id: 1,
    title: "EcoTrack",
    description: "AI-powered carbon footprint tracking for small businesses with automated sustainability reporting and actionable insights.",
    tags: ["AI", "Sustainability", "Analytics"],
    category: "GreenTech",
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400&h=400&fit=crop&crop=face",
      role: "Environmental Engineer"
    },
    media: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    likes: 124,
    views: 1520,
    comments: 23,
    trending: true,
    createdAt: "2024-06-19"
  },
  {
    id: 2,
    title: "MindfulAI",
    description: "Personalized mental wellness app using machine learning to adapt meditation and mindfulness practices to user behavior patterns.",
    tags: ["AI", "Mental Health", "Wellness"],
    category: "HealthTech",
    user: {
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      role: "Clinical Psychologist"
    },
    media: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    likes: 89,
    views: 892,
    comments: 15,
    trending: false,
    createdAt: "2024-06-18"
  },
  {
    id: 3,
    title: "LocalConnect",
    description: "Hyperlocal community platform connecting neighbors for skill sharing, tool lending, and local event coordination.",
    tags: ["Community", "Social", "Local"],
    category: "Social Impact",
    user: {
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      role: "Community Organizer"
    },
    media: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    likes: 156,
    views: 2103,
    comments: 34,
    trending: true,
    createdAt: "2024-06-17"
  },
  {
    id: 4,
    title: "CodeMentor AI",
    description: "Intelligent coding assistant that provides real-time code reviews, bug detection, and personalized learning paths for developers.",
    tags: ["AI", "Education", "Developer Tools"],
    category: "EdTech",
    user: {
      name: "Alex Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      role: "Software Engineer"
    },
    media: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    likes: 203,
    views: 3456,
    comments: 67,
    trending: true,
    createdAt: "2024-06-16"
  },
  {
    id: 5,
    title: "FarmersMarket+",
    description: "Digital platform connecting local farmers directly with consumers, featuring real-time inventory, delivery scheduling, and sustainable farming metrics.",
    tags: ["Agriculture", "Marketplace", "Sustainability"],
    category: "AgriTech",
    user: {
      name: "David Kumar",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
      role: "Agricultural Specialist"
    },
    media: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&h=400&fit=crop",
    likes: 78,
    views: 654,
    comments: 12,
    trending: false,
    createdAt: "2024-06-15"
  }
];

const categories = ["All", "GreenTech", "HealthTech", "EdTech", "AgriTech", "Social Impact"];
const sortOptions = ["Trending", "Recent", "Most Liked"];

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter and sort logic
  const filteredStartups = mockStartups
    .filter(startup => {
      const matchesSearch = startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          startup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || startup.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.likes - a.likes;
        case "Recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "Most Liked":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const displayedStartups = filteredStartups.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredStartups.length));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation/>
      <FeedTopBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="container mx-auto px-4 pt-20 pb-24 lg:pb-8">
        <FeedFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOptions={sortOptions}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing {displayedStartups.length} of {filteredStartups.length} ideas
          </p>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {displayedStartups.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StartupCard startup={startup} />
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredStartups.length && (
          <div className="text-center">
            <motion.button
              onClick={loadMore}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Ideas
            </motion.button>
          </div>
        )}

        {/* Empty State */}
        {filteredStartups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No ideas found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {/* <BottomNavigation /> */}
    </div>
  );
};

export default Feed;