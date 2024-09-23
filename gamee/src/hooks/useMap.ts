import { useEffect, useState } from "react";
import { Territory, TeamColor, teamColorToId } from "@/types/index";

const MAPURL = 'http://localhost:3000/map';


export function useMap() {


    const [mapTerritory, setMapTerritory] = useState<Territory[]>([]);

    const updateTerritory = async (index: number, team: TeamColor | null) => {
        const newTerritory = [...mapTerritory];
        newTerritory[index] = {
            ...newTerritory[index],
            team: team,
        };

        const updateTerritory = { ...newTerritory[index], team: team ? teamColorToId[team] : null };
        const response = await fetch(MAPURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateTerritory),
        });
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
        fetch(MAPURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateTerritory),
        })
            .then((response) => {
                if (response.ok) {
                    setMapTerritory(newTerritory);
                } else {
                    console.error('Failed to update territory');
                }
            });
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