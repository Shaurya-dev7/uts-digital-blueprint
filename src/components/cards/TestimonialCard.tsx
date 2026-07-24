import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import GlareHover from "@/components/ui/GlareHover";

interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
}

export function TestimonialCard({ quote, author, company }: TestimonialCardProps) {
  return (
    <div className="h-full relative group rounded-xl">
      <GlareHover 
        className="w-full h-full rounded-xl"
        background="transparent"
        borderColor="transparent"
        glareColor="#ffffff"
        glareOpacity={0.15}
        transitionDuration={500}
      >
        <Card className="bg-charcoal border-gray-800 text-white h-full relative overflow-hidden group shadow-none">
          <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-800 group-hover:text-red/20 transition-colors duration-500" />
          <CardContent className="p-8 flex flex-col h-full relative z-10">
            <p className="text-gray-300 text-lg leading-relaxed flex-1 italic mb-8">&quot;{quote}&quot;</p>
            <div>
              <h4 className="font-bold text-white text-lg">{author}</h4>
              <p className="text-red font-medium text-sm">{company}</p>
            </div>
          </CardContent>
        </Card>
      </GlareHover>
    </div>
  );
}
