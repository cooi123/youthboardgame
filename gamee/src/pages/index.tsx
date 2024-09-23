import GameMap from "@/components/GameMap";
import {Territory, TeamColor} from "@/types/index";
import DefaultLayout from "@/layouts/default";
import AnnouncementBar from "@/components/Announcement";
import {useNavigate} from "react-router-dom";
import {PointCard} from "@/components/PointCard";
import {ItemList} from "@/components/ItemList";
const testTerritory: Territory[] = Array.from({length: 49}, (_, i) => ({
  gridNumber: i,
  team: null,
  shield: false,
}));

console.log(testTerritory);

import {useAuth} from "@/hooks/useAuth";

export default function MapPage() {
  const navigate = useNavigate();
  const {user} = useAuth();

  console.log(user);

  if (!user) {
    navigate("/login");
  }
  const itemList = [
    {name: "Soldier", quantity: user?.soldier},
    {name: "Shield", quantity: user?.shield},
  ];
  return (
    <DefaultLayout>
      <div className="w-full">
        <AnnouncementBar message="Welcome to the game" day="1" />
      </div>
      <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
        <div className="flex-1 aspect-square p-4">
          <GameMap />
        </div>

        <div className="p-4 w-full">
          <PointCard points={user?.points} />
          <ItemList items={itemList}></ItemList>
        </div>
      </div>
    </DefaultLayout>
  );
}
