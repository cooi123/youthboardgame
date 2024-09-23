import GameMap from "@/components/GameMap";
import {Territory, Announcement} from "@/types/index";
import DefaultLayout from "@/layouts/default";
import AnnouncementBar from "@/components/Announcement";
import {useNavigate} from "react-router-dom";
import {PointCard} from "@/components/PointCard";
import {ItemList} from "@/components/ItemList";
import {useState, useEffect} from "react";

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
  const [announcement, setAnnouncement] = useState<Announcement>({
    message: "Welcome to the game",
    day: "1",
  });

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await fetch("http://localhost:3000/announcement");
      const data = await response.json();
      setAnnouncement(data);
    };
    fetchAnnouncement();
    console.log(announcement);
    const interval = setInterval(fetchAnnouncement, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateAnnouncement = async (announcement: Announcement) => {
    await fetch("http://localhost:3000/announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcement),
    });
    setAnnouncement(announcement);
  };
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
        <AnnouncementBar
          announcement={announcement}
          viewOnly={user?.role.toString() === "player"}
          setAnnouncement={updateAnnouncement}
        />
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
