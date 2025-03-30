
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { Upload } from 'lucide-react';

const UploadSchedulePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Schedule uploaded successfully!");
      navigate('/quote');
    }, 1500);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Upload Your Insurance Schedule</CardTitle>
            <CardDescription className="text-center">
              Upload your current insurance policy schedule to get a competitive quote from Micro Shield
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div className="text-lg font-medium">
                    {file ? (
                      <span className="text-primary">{file.name}</span>
                    ) : (
                      <span>Drag and drop your file here or click to browse</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, Word, JPG, PNG (Max 10MB)
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="w-full max-w-md"
                  disabled={!file || isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Schedule and Continue'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
            <p>Your data is secure and encrypted. We'll use this information to provide you with a competitive quote.</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default UploadSchedulePage;
