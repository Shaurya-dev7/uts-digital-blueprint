import { Card, CardContent } from "@/components/ui/card";

interface TimelineCardProps {
  year: string;
  title: string;
  description: string;
}

export function TimelineCard({ year, title, description }: TimelineCardProps) {
  return (
    <Card className="relative border-l-4 border-l-red border-y-0 border-r-0 rounded-none shadow-sm hover:shadow-md transition-shadow bg-white ml-6">
      <div className="absolute -left-[30px] top-4 w-6 h-6 rounded-full bg-red border-4 border-white shadow-sm" />
      <CardContent className="p-6">
        <span className="text-sm font-bold text-red mb-1 block">{year}</span>
        <h4 className="text-xl font-bold text-navy mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
