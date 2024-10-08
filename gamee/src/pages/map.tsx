import GameMap from "@/components/GameMap";
import {Territory} from "@/types/index";
import DefaultLayout from "@/layouts/default";
import {useNavigate} from "react-router-dom";
const testTerritory: Territory[] = Array.from({length: 49}, (_, i) => ({
  gridNumber: i,
  team: null,
  shield: false,
}));

console.log(testTerritory);

import {useAuth} from "@/hooks/useAuth";

export default function MapPage() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
        <div className="flex-1 aspect-square p-4">
          <GameMap viewOnly={true} />
        </div>
      </div>
    </DefaultLayout>
  );
}
