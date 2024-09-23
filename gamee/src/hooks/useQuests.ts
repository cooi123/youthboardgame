import { useState, useEffect } from "react";
import { NewQuest, Quest } from "../types/index";
import { toast } from "react-toastify";
const base_url = import.meta.env.VITE_BACKENDURL as string
const QUESTURL = base_url + "/quest";

export function useQuests() {
    const [quests, setQuests] = useState<Quest[]>([]);



    const fetchQuests = async () => {
        console.log("fetching quests");
        const fetching = fetch(QUESTURL + "/all");

        const response = await fetching;
        if (response.ok) {
            const data = await response.json();
            setQuests(data);
        }
    }

    useEffect(() => {
        fetchQuests();
    }, []);

    const markQuestAsDone = async (questId: number) => {

        const response = await toast.promise(fetch(QUESTURL + '/' + questId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ complete: false }),
        }), {

            pending: 'Updating quest status',
            success: 'Quest updated',
            error: 'Error updating quest',
        });

        if (response.ok) {
            const data = await response.json();
            setQuests(data);
        }
    }

    const markQuestAsUndone = async (questId: number) => {
        const fetching = fetch(QUESTURL + '/' + questId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ complete: true }),
        });
        toast.promise(fetching, {
            pending: 'Updating quest status',
            success: 'Quest updated',
            error: 'Error updating quest',
        });
        const response = await fetching;
        if (response.ok) {
            const data = await response.json();
            setQuests(data);
        }
    }

    const deleteQuest = async (questId: number) => {

        const response = await toast.promise(fetch(QUESTURL + "/" + questId, {
            method: 'DELETE',
        }), {
            pending: 'Deleting quest',
            success: 'Quest deleted',
            error: 'Error deleting quest',
        });
        if (response.ok) {
            setQuests(quests.filter((quest) => quest.id !== questId));
        }
    }

    const addQuest = async (quest: NewQuest) => {
        const fetching = fetch(QUESTURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quest),
        });
        toast.promise(fetching, {
            pending: 'Adding',
            success: 'Quest added',
            error: 'Error adding quest',
        });
        const response = await fetching;
        if (response.ok) {
            const data = await response.json();
            setQuests([...quests, data]);
        }
    }

    return { quests, fetchQuests, markQuestAsDone, addQuest, deleteQuest, markQuestAsUndone };
}