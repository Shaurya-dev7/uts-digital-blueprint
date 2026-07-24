import { Card, CardContent } from "@/components/ui/card";

interface StatisticCardProps {
  value: string;
  label: string;
}

export function StatisticCard({ value, label }: StatisticCardProps) {
  return (
    <Card className="bg-charcoal border-gray-800 text-center py-8 hover:bg-navy transition-colors cursor-default">
      <CardContent className="p-0 space-y-2">
        <h4 className="text-4xl md:text-5xl font-extrabold text-white">{value}</h4>
        <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{label}</p>
      </CardContent>
    </Card>
  );
}
