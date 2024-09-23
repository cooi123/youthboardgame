import {Quest} from "@/types/index";

export default function GameQuests({
  quests,
  editable = false,
  title = "Game Quests",
  removeQuest,
  completeQuest,
  markQuestAsUnDone,
}: {
  quests: Quest[];
  editable?: boolean;
  removeQuest?: (id: number) => void;
  title?: string;
  completeQuest?: (id: number) => void;
  markQuestAsUnDone?: (id: number) => void;
}) {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-[600px] bg-gray-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Display the quests */}
        <ul className="space-y-4 mb-4">
          {quests.map((quest) => (
            <li key={quest.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className={`text-xl font-semibold text-gray-700 ${
                      quest.done ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {quest.name}
                  </h3>
                  <p
                    className={`text-gray-600 ${
                      quest.done ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {quest.description}
                  </p>
                  <p className="text-gray-600">Points: {quest.points}</p>
                </div>
                <div className="flex space-x-2">
                  {editable && quest.done && (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() => completeQuest && completeQuest(quest.id)}
                    >
                      Not Completed
                    </button>
                  )}
                  {editable && !quest.done && (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() =>
                        markQuestAsUnDone && markQuestAsUnDone(quest.id)
                      }
                    >
                      Completed
                    </button>
                  )}

                  {editable && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => removeQuest && removeQuest(quest.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
