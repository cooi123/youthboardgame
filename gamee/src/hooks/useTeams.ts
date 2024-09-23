import { useEffect, useState } from "react";
import { User } from "../types/index";
import { toast } from "react-toastify";
const TEAMURL = "http://localhost:3000/user/all";

export function useTeams() {
    const [teams, setTeams] = useState<User[]>([]);
    const fetchTeams = async () => {
        console.log("fetching Teams");
        const fetching = fetch(TEAMURL);

        const response = await fetching;


        if (response.ok) {
            const data = await response.json();
            setTeams(data);
        }
    }
    useEffect(() => {
        fetchTeams();
    }, []);

    const updateTeams = async (Teams: User[]) => {
        console.log(Teams);
        const fetching = fetch(TEAMURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Teams),
        });
        toast.promise(fetching, {
            pending: 'Updating',
            success: 'Teams updated',
            error: 'Failed to update Teams',
        });
        const response = await fetching;
        if (response.ok) {
            const data = await response.json();
            setTeams(data);
        }
    }





    return { teams, fetchTeams, updateTeams }
}