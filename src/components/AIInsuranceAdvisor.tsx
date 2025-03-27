
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { INSURANCE_TYPES } from "@/utils/constants";

const AIInsuranceAdvisor = () => {
  const [businessDescription, setBusinessDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [recommendedInsurance, setRecommendedInsurance] = useState<string[]>([]);
  const { toast } = useToast();

  const analyzeBusinessNeeds = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Please describe your business",
        description: "We need some information about your business to provide recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAiResponse(null);
    setRecommendedInsurance([]);

    try {
      // For demo purposes, we'll simulate an API call
      // In production, this would call an API connected to GPT-4o
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulated GPT-4o response
      const businessText = businessDescription.toLowerCase();
      const recommendations: string[] = [];
      
      // Simple keyword matching for demonstration
      if (businessText.includes("consult") || businessText.includes("advice") || 
          businessText.includes("service") || businessText.includes("profession")) {
        recommendations.push("professional-indemnity");
      }
      
      if (businessText.includes("build") || businessText.includes("construct") || 
          businessText.includes("contractor") || businessText.includes("site")) {
        recommendations.push("contractors-all-risk");
      }
      
      if (businessText.includes("shop") || businessText.includes("customer") || 
          businessText.includes("premise") || businessText.includes("store") || 
          businessText.includes("visit") || businessText.includes("public")) {
        recommendations.push("public-liability");
      }
      
      if (businessText.includes("event") || businessText.includes("venue") || 
          businessText.includes("festival") || businessText.includes("conference") ||
          businessText.includes("gathering")) {
        recommendations.push("event-liability");
      }
      
      // If no specific matches, recommend professional indemnity as default
      if (recommendations.length === 0) {
        recommendations.push("professional-indemnity");
      }

      const aiResponseText = `Based on your description, I recommend the following insurance coverage for your business: ${recommendations.map(id => {
        const insurance = INSURANCE_TYPES.find(ins => ins.id === id);
        return insurance ? insurance.title : "";
      }).filter(Boolean).join(", ")}.`;

      setAiResponse(aiResponseText);
      setRecommendedInsurance(recommendations);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't analyze your business needs. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border border-primary/10 bg-secondary/30">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">What insurance do I need?</h3>
          <Sparkles className="ml-2 h-4 w-4 text-yellow-400" />
        </div>
        
        <p className="text-muted-foreground mb-6">
          Describe your business, and our AI assistant will recommend the right insurance coverage for your needs.
        </p>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Tell us about your business... (e.g., 'I run a small web development agency with 3 employees, providing services to local businesses')"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <Button 
            onClick={analyzeBusinessNeeds} 
            disabled={isAnalyzing || !businessDescription.trim()}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing..." : "Get AI Recommendations"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <div className="bg-primary/5 rounded-lg p-4 mb-4">
              <p className="text-sm">{aiResponse}</p>
            </div>
            
            {recommendedInsurance.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Explore recommended coverage:</p>
                <div className="flex flex-wrap gap-2">
                  {recommendedInsurance.map((insuranceId) => {
                    const insurance = INSURANCE_TYPES.find(ins => ins.id === insuranceId);
                    if (!insurance) return null;
                    
                    return (
                      <Link 
                        key={insuranceId} 
                        to={`/coverage/${insuranceId}`}
                        className="inline-block"
                      >
                        <Button variant="outline" size="sm">
                          {insurance.title}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsuranceAdvisor;
