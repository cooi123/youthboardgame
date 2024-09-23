import { useEffect, useState } from "react";
import { Territory, TeamColor, teamColorToId } from "@/types/index";
import { toast } from "react-toastify";

const base_url = import.meta.env.VITE_BACKENDURL as string
const MAPURL = base_url + '/map';


export function useMap() {


    const [mapTerritory, setMapTerritory] = useState<Territory[]>([]);

    const updateTerritory = async (index: number, team: TeamColor | null) => {
        const newTerritory = [...mapTerritory];
        newTerritory[index] = {
            ...newTerritory[index],
            team: team,
        };

        const updateTerritory = { ...newTerritory[index], team: team ? teamColorToId[team] : null };
        const fetching = fetch(MAPURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateTerritory),
        });
        toast.promise(fetching, {
            pending: 'Updating territory...',
            success: 'Territory updated!',
            error: 'Failed to update territory',
        });

        const response = await fetching
        if (response.ok) {
            setMapTerritory(newTerritory);
        } else {
            console.error('Failed to update territory');
        }
    };

    const updateShield = async (index: number, shield: boolean) => {
        const newTerritory = [...mapTerritory];
        const currentTerritory = newTerritory[index] = {
            ...newTerritory[index],
            shield: shield,
        };
        const teamColor = currentTerritory.team;
        console.log(newTerritory[index]);
        const updateTerritory = { ...newTerritory[index], team: teamColor ? teamColorToId[teamColor] : null, shield: shield };
        const fetching = fetch(MAPURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateTerritory),
        })
        toast.promise(fetching, {
            pending: 'Updating territory...',
            success: 'Territory updated!',
            error: 'Failed to update territory',
        });
        const response = await fetching
        if (response.ok) {
            setMapTerritory(newTerritory);
        }
        else {
            console.error('Failed to update territory');
        }


    };

    useEffect(() => {

        const fetchMap = async () => {
            const response = await fetch(MAPURL);
            const data = await response.json();
            console.log(data);
            const reduceTeam = data.map((territory: any) => {
                return {
                    gridNumber: territory.gridNumber,
                    shield: territory.shield,
                    team: territory.team ? territory.team.color : null
                } as Territory;
            })
            console.log(reduceTeam);
            setMapTerritory(reduceTeam);
        }
        fetchMap();
        const interval = setInterval(() => {
            fetchMap();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return { mapTerritory, setMapTerritory, updateTerritory, updateShield };
}