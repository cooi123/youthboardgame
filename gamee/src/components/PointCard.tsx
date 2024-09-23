import {Star} from "lucide-react";
export function PointCard({points}) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        Points
      </h2>
      <p className="text-2xl font-bold">{points}</p>
    </div>
  );
}
