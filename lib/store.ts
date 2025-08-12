import { create } from "zustand"

export interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image?: string
  isFeatured: boolean
  views?: number
  likes?: number
  comments?: number
}

interface StoreItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  inStock: boolean
}

interface StoreState {
  stories: Story[]
  storeItems: StoreItem[]
  addStory: (story: Omit<Story, "id">) => void
  updateStory: (id: string, story: Partial<Story>) => void
  deleteStory: (id: string) => void
  getFeaturedStories: () => Story[]
  getMoreStories: () => Story[]
  addStoreItem: (item: Omit<StoreItem, "id">) => void
  updateStoreItem: (id: string, item: Partial<StoreItem>) => void
  deleteStoreItem: (id: string) => void
}

const useStore = create<StoreState>((set, get) => ({
  stories: [
    {
      id: "1",
      title: "Revolutionary Breakthrough in Organic Chemistry",
      excerpt:
        "Researchers at PACSMIN have discovered a new synthetic pathway that could revolutionize pharmaceutical manufacturing.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Research",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
      isFeatured: true,
      views: 1250,
      likes: 89,
      comments: 23,
    },
    {
      id: "2",
      title: "PACSMIN Annual Conference 2024 Highlights",
      excerpt: "Over 500 chemistry professionals gathered to share the latest innovations and research findings.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Prof. Michael Chen",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Event",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
      isFeatured: true,
      views: 980,
      likes: 67,
      comments: 15,
    },
    {
      id: "3",
      title: "New Laboratory Safety Protocols",
      excerpt: "Updated safety guidelines ensure the highest standards of protection for all chemistry professionals.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Dr. Emily Rodriguez",
      date: "2024-01-08",
      readTime: "3 min read",
      category: "News",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop",
      isFeatured: false,
      views: 654,
      likes: 43,
      comments: 8,
    },
    {
      id: "4",
      title: "Student Research Showcase Winners",
      excerpt: "Celebrating the next generation of chemists and their groundbreaking research projects.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Dr. James Wilson",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      isFeatured: false,
      views: 432,
      likes: 29,
      comments: 12,
    },
    {
      id: "5",
      title: "Green Chemistry Initiative Launch",
      excerpt: "PACSMIN launches new sustainability program to promote environmentally friendly chemical practices.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Dr. Lisa Thompson",
      date: "2024-01-03",
      readTime: "4 min read",
      category: "Opportunity",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
      isFeatured: false,
      views: 789,
      likes: 56,
      comments: 18,
    },
    {
      id: "6",
      title: "Advanced Spectroscopy Workshop",
      excerpt: "Hands-on training session covering the latest techniques in molecular analysis and characterization.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Prof. David Kim",
      date: "2024-01-01",
      readTime: "7 min read",
      category: "Alumni",
      image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&h=400&fit=crop",
      isFeatured: false,
      views: 567,
      likes: 38,
      comments: 9,
    },
  ],
  storeItems: [
    {
      id: "1",
      name: "PACSMIN Professional T-Shirt",
      price: 25.99,
      image: "/store/tshirt.webp",
      category: "Apparel",
      description: "High-quality cotton t-shirt with PACSMIN logo",
      inStock: true,
    },
    {
      id: "2",
      name: "Chemistry Lab Notebook",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      category: "Stationery",
      description: "Professional lab notebook with grid pages",
      inStock: true,
    },
    {
      id: "3",
      name: "PACSMIN Coffee Mug",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      category: "Drinkware",
      description: "Ceramic mug perfect for your morning coffee",
      inStock: false,
    },
  ],
  addStory: (story) =>
    set((state) => ({
      stories: [...state.stories, { ...story, id: Date.now().toString() }],
    })),
  updateStory: (id, updatedStory) =>
    set((state) => ({
      stories: state.stories.map((story) => (story.id === id ? { ...story, ...updatedStory } : story)),
    })),
  deleteStory: (id) =>
    set((state) => ({
      stories: state.stories.filter((story) => story.id !== id),
    })),
  getFeaturedStories: () => {
    const state = get()
    return state.stories.filter(story => story.isFeatured)
  },
  getMoreStories: () => {
    const state = get()
    return state.stories.filter(story => !story.isFeatured)
  },
  addStoreItem: (item) =>
    set((state) => ({
      storeItems: [...state.storeItems, { ...item, id: Date.now().toString() }],
    })),
  updateStoreItem: (id, updatedItem) =>
    set((state) => ({
      storeItems: state.storeItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)),
    })),
  deleteStoreItem: (id) =>
    set((state) => ({
      storeItems: state.storeItems.filter((item) => item.id !== id),
    })),
}))

export default useStore