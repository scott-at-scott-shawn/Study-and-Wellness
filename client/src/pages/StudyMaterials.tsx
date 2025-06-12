import { useState, useEffect } from "react";
import { Search, Plus, ExternalLink, FileText, Link, Video, Calculator, FlaskRound, Book, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStudyMaterials, saveStudyMaterial, deleteStudyMaterial, searchStudyMaterials } from "../lib/localStorage";
import { LocalStorageStudyMaterial } from "../types";
import { useToast } from "@/hooks/use-toast";

export default function StudyMaterials() {
  const [materials, setMaterials] = useState<LocalStorageStudyMaterial[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "",
    url: "",
    category: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    loadMaterials();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchStudyMaterials(searchQuery);
      setMaterials(filtered);
    } else {
      loadMaterials();
    }
  }, [searchQuery]);

  const loadMaterials = () => {
    const storedMaterials = getStudyMaterials();
    setMaterials(storedMaterials);
  };

  const handleAddMaterial = () => {
    if (!newMaterial.title || !newMaterial.type || !newMaterial.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    saveStudyMaterial(newMaterial);
    setNewMaterial({ title: "", type: "", url: "", category: "" });
    setIsAddModalOpen(false);
    loadMaterials();
    
    toast({
      title: "Success",
      description: "Study material added successfully!",
    });
  };

  const handleDeleteMaterial = (id: string) => {
    deleteStudyMaterial(id);
    loadMaterials();
    toast({
      title: "Deleted",
      description: "Study material removed.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="text-red-500" />;
      case 'link': return <Link className="text-blue-500" />;
      case 'video': return <Video className="text-purple-500" />;
      default: return <FileText className="text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mathematics': return <Calculator className="text-blue-600" />;
      case 'science': return <FlaskRound className="text-green-600" />;
      case 'literature': return <Book className="text-amber-600" />;
      default: return <Book className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mathematics': return 'bg-blue-100';
      case 'science': return 'bg-green-100';
      case 'literature': return 'bg-amber-100';
      default: return 'bg-gray-100';
    }
  };

  const materialsByCategory = materials.reduce((acc, material) => {
    const category = material.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(material);
    return acc;
  }, {} as Record<string, LocalStorageStudyMaterial[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Study Materials</h3>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-study-primary hover:bg-study-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Study Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="material-title">Title</Label>
                <Input
                  id="material-title"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  placeholder="Material title"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={newMaterial.type} onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select value={newMaterial.category} onValueChange={(value) => setNewMaterial({ ...newMaterial, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="material-url">URL (optional)</Label>
                <Input
                  id="material-url"
                  value={newMaterial.url}
                  onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMaterial}>
                  Add Material
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search materials, links, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Material Categories */}
      {Object.keys(materialsByCategory).length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study materials yet</h3>
            <p className="text-gray-500 mb-4">Start building your study collection by adding your first material.</p>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-study-primary hover:bg-study-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Material
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(materialsByCategory).map(([category, categoryMaterials]) => (
            <Card key={category}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${getCategoryColor(category)} rounded-lg flex items-center justify-center mr-3`}>
                      {getCategoryIcon(category)}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {categoryMaterials.length} items
                  </span>
                </div>
                <div className="space-y-2">
                  {categoryMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <GripVertical className="text-gray-400 mr-2 h-4 w-4" />
                      {getTypeIcon(material.type)}
                      <span className="text-sm text-gray-700 flex-1 ml-2 truncate">
                        {material.title}
                      </span>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {material.url && (
                          <button
                            onClick={() => window.open(material.url, '_blank')}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
