"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Calendar, User } from "lucide-react"

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("featured")

  // Mock content data
  const featuredStories = [
    {
      id: 1,
      title: "Revolutionary Green Chemistry Breakthrough: PACSMIN Students Develop Eco-Friendly Catalyst",
      excerpt:
        "A groundbreaking discovery by PACSMIN researchers has led to the development of a new biodegradable catalyst...",
      author: "Dr. Maria Santos",
      date: "2024-01-15",
      category: "Research",
      status: "Published",
      views: "2.1k",
      likes: "156",
    },
    {
      id: 2,
      title: "PACSMIN's Annual Research Summit Highlights Student Innovations",
      excerpt:
        "This year's summit showcased incredible student-led research projects, pushing the boundaries of chemical science...",
      author: "Prof. David Lee",
      date: "2024-01-10",
      category: "Event",
      status: "Published",
      views: "1.8k",
      likes: "120",
    },
  ]

  const moreStories = [
    {
      id: 3,
      title: "PACSMIN Wins National Chemistry Competition 2024",
      excerpt: "Our team secured first place in the prestigious National Chemistry Olympiad...",
      author: "John Dela Cruz",
      date: "2024-01-12",
      category: "Achievement",
      status: "Published",
      views: "1.5k",
      likes: "89",
    },
    {
      id: 4,
      title: "New Laboratory Facilities Open at Partner Universities",
      excerpt: "State-of-the-art chemistry labs equipped with cutting-edge technology...",
      author: "Sarah Kim",
      date: "2024-01-08",
      category: "News",
      status: "Draft",
      views: "0",
      likes: "0",
    },
  ]

  const homepageContent = [
    {
      id: 1,
      section: "Hero Title",
      content: "Philippine Association of Chemistry Students",
      lastUpdated: "2024-01-01",
      updatedBy: "Admin",
    },
    {
      id: 2,
      section: "Hero Subtitle",
      content:
        "Empowering the next generation of chemists through innovation, collaboration, and scientific excellence across the Philippines.",
      lastUpdated: "2024-01-01",
      updatedBy: "Admin",
    },
    {
      id: 3,
      section: "About Section Title",
      content: "About PACSMIN",
      lastUpdated: "2023-12-15",
      updatedBy: "Admin",
    },
  ]

  const ContentForm = ({ content, type, onClose }: { content?: any; type: string; onClose: () => void }) => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {type === "story" && (
        <>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" defaultValue={content?.title} />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" defaultValue={content?.excerpt} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" defaultValue={content?.author} />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={content?.category?.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="opportunity">Opportunity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="content">Full Content</Label>
            <Textarea id="content" rows={6} placeholder="Write the full article content here..." />
          </div>
        </>
      )}

      {type === "homepage" && (
        <>
          <div>
            <Label htmlFor="section">Section</Label>
            <Input id="section" defaultValue={content?.section} disabled />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" defaultValue={content?.content} rows={4} />
          </div>
        </>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {type === "story" && <Button variant="outline">Save as Draft</Button>}
        <Button onClick={onClose}>Save</Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage stories, news, and homepage content</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Featured Stories</TabsTrigger>
          <TabsTrigger value="more">More Stories</TabsTrigger>
          <TabsTrigger value="homepage">Homepage Content</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Featured Stories</h2>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Featured Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Featured Story</DialogTitle>
                </DialogHeader>
                <ContentForm type="story" onClose={() => setIsCreateModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search featured stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Story</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featuredStories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{story.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{story.excerpt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <User className="mr-1 h-3 w-3" />
                          {story.author}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          {story.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{story.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>👁️ {story.views} views</div>
                          <div>❤️ {story.likes} likes</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={story.status === "Published" ? "default" : "secondary"}>{story.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="more" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">More Stories</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Story
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Story</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moreStories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{story.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{story.excerpt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <User className="mr-1 h-3 w-3" />
                          {story.author}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          {story.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{story.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>👁️ {story.views} views</div>
                          <div>❤️ {story.likes} likes</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={story.status === "Published" ? "default" : "secondary"}>{story.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Homepage Content</h2>
            <p className="text-gray-600">Edit text content that appears on the homepage</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {homepageContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <p className="font-medium">{item.section}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm line-clamp-3 max-w-md">{item.content}</p>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{item.lastUpdated}</div>
                          <div className="text-gray-500">by {item.updatedBy}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit {item.section}</DialogTitle>
                            </DialogHeader>
                            <ContentForm content={item} type="homepage" onClose={() => {}} />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
