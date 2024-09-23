import DefaultLayout from "@/layouts/default";
import GameQuests from "@/components/GameQuest";
import {useAuth} from "@/hooks/useAuth";
import {Quest} from "@/types/index";
import {useState, useEffect} from "react";
import {RefreshCcw} from "lucide-react";
import {toast} from "react-toastify";
const QUESTURL = "http://localhost:3000/quest";
export default function QuestPage() {
  const {user} = useAuth();
  console.log(user);
  const [quests, setQuests] = useState<Quest[]>([]);

  const fetchQuests = async () => {
    console.log("fetching quests");
    const fetching = fetch(QUESTURL + "/team/" + user?.id);
    toast.promise(fetching, {
      pending: "Fetching quests...",
      success: "Quests fetched!",
      error: "Failed to fetch quests",
    });

    const response = await fetching;
    if (response.ok) {
      const data = await response.json();
      setQuests(data);
    }
  };
  useEffect(() => {
    fetchQuests();
  }, [user]);
  console.log(quests);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        {/* Refresh button */}

        {/* User greeting */}
        {user && (
          <h1 className="text-3xl font-bold text-gray-800">
            Quests for {user.name}
          </h1>
        )}
        <button
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-200 text-white"
          onClick={fetchQuests}
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
        {/* Quest display */}
        {quests.length === 0 ? (
          <p className="text-lg text-gray-500">No quests available</p>
        ) : (
          <div className="w-full max-w-4xl">
            <GameQuests quests={quests} />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
