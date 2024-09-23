import GameQuests from "./GameQuest";
import {useQuests} from "@/hooks/useQuests";
import {Quest, User, NewQuest} from "@/types/index"; // Ensure Team type is imported
import {useState} from "react";

export function QuestManagement({teams}: {teams: User[]}) {
  const {quests, markQuestAsDone, deleteQuest, addQuest, markQuestAsUndone} =
    useQuests(); // Assuming `useQuests` also returns a list of teams

  const [newQuest, setNewQuest] = useState<NewQuest>({
    name: "",
    description: "",
    team_id: 0,
    points: 0,
  });

  //   Group quests by team
  const groupQuestsByTeam = (quests: Quest[]) => {
    return quests.reduce(
      (
        groupedQuests: {[key: string]: {team: string; quests: Quest[]}},
        quest
      ) => {
        const teamId = quest.team?.name || "No Team";

        if (!groupedQuests[teamId]) {
          groupedQuests[teamId] = {
            team: quest.team.name,
            quests: [],
          };
        }

        // Add the current quest to the team's quest list
        groupedQuests[teamId].quests.push(quest);

        return groupedQuests;
      },
      {}
    );
  };

  const groupedQuests = groupQuestsByTeam(quests);

  // Handle input changes for new quest
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target;
    setNewQuest({
      ...newQuest,
      [name]: value,
    });
  };

  // Handle adding the new quest
  const handleAddQuest = () => {
    if (newQuest.name && newQuest.description && newQuest.team_id >= 0) {
      // Call addQuest with title, description, and teamId
      console.log(newQuest);
      addQuest(newQuest);
      setNewQuest({
        name: "",
        description: "",
        team_id: 0,
        points: 0,
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="space-y-8">
      {Object.keys(groupedQuests).map((teamName) => (
        <div key={teamName} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            {teamName}
          </h2>
          <GameQuests
            title={""}
            quests={groupedQuests[teamName].quests}
            editable={true}
            completeQuest={markQuestAsDone}
            removeQuest={deleteQuest}
            markQuestAsUnDone={markQuestAsUndone}
          />
        </div>
      ))}

      {/* Form to add a new quest */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Add New Quest</h3>

        {/* Quest Title */}
        <input
          type="text"
          name="name"
          value={newQuest.name}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
          placeholder="Quest Title"
        />

        {/* Quest Description */}
        <textarea
          name="description"
          value={newQuest.description}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
          placeholder="Quest Description"
        />
        {/* Quest Point */}
        <input
          type="number"
          name="points"
          value={newQuest.points}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
          placeholder="Quest Point"
        />

        {/* Dropdown to select a team */}
        <select
          name="team_id"
          value={teams.find((team) => team.id === newQuest.team_id)?.id}
          onChange={handleInputChange}
          className=" mb-4 p-2 border"
        >
          <option value="">Select a Team</option>
          {teams.map((team: User) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        {/* Button to add the quest */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleAddQuest}
        >
          Add Quest
        </button>
      </div>
    </div>
  );
}
