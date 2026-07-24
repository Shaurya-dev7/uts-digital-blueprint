import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
      <CardHeader>
        <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-red" />
        </div>
        <CardTitle className="text-xl text-navy">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
