"use client";
import {useState} from "react";
import {
  allTeams,
  Territory,
  teamColorsWithTransparency,
  TeamColor,
} from "@/types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import {Circle} from "lucide-react";
import {useAuth} from "@/hooks/useAuth";
import {useMap} from "@/hooks/useMap";
export default function GameMap({viewOnly}: {viewOnly?: boolean}) {
  const {user} = useAuth();
  const {mapTerritory, updateTerritory, updateShield} = useMap();
  if (!mapTerritory) {
    return null;
  }
  if (viewOnly) {
    return (
      <div className="relative w-[700px] h-[700px]">
        <img
          src="/GameMap.png"
          alt="Map Grid"
          className="absolute w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-7 grid-rows-7">
          {mapTerritory.map((territory, index) => (
            <div key={index} className="relative border border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="absolute w-full h-full z-10"
              >
                <rect
                  width="100"
                  height="100"
                  fill={
                    territory.team
                      ? teamColorsWithTransparency[territory.team]
                      : "transparent"
                  }
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-[700px] h-[700px]">
      <img
        src="/GameMap.png"
        alt="Map Grid"
        className="absolute w-full h-full object-cover z-0"
      />

      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-7 grid-rows-7">
        {mapTerritory.map((territory, index) => (
          <div key={index} className="relative border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="absolute w-full h-full z-10"
            >
              {user?.role === "admin" ? (
                // If user is admin, show the dropdown
                <Dropdown>
                  <DropdownTrigger>
                    {mapTerritory[index].shield ? (
                      <Circle
                        size="100"
                        fill={
                          territory.team
                            ? teamColorsWithTransparency[territory.team]
                            : "transparent"
                        }
                        stroke="black"
                        strokeWidth="1"
                      />
                    ) : (
                      <rect
                        width="100"
                        height="100"
                        fill={
                          territory.team
                            ? teamColorsWithTransparency[territory.team]
                            : "transparent"
                        }
                        stroke="black"
                        strokeWidth="2"
                      />
                    )}
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownSection title="Assign Territory">
                      {allTeams.map((team) => (
                        <DropdownItem
                          key={team}
                          onClick={() => updateTerritory(index, team)}
                        >
                          {team}
                        </DropdownItem>
                      ))}
                    </DropdownSection>
                    <DropdownSection title="Other">
                      <DropdownItem
                        onClick={() => updateTerritory(index, null)}
                      >
                        Reset Territory
                      </DropdownItem>
                      <DropdownItem onClick={() => updateShield(index, true)}>
                        Add Shield
                      </DropdownItem>
                      <DropdownItem onClick={() => updateShield(index, false)}>
                        Remove Shield
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                // If user is not admin, just render the shape without interactivity
                <>
                  {mapTerritory[index].shield &&
                  mapTerritory[index].team == user?.color ? (
                    <Circle
                      size="100"
                      fill={
                        territory.team
                          ? teamColorsWithTransparency[territory.team]
                          : "transparent"
                      }
                      stroke="black"
                      strokeWidth="1"
                    />
                  ) : (
                    <rect
                      width="100"
                      height="100"
                      fill={
                        territory.team
                          ? teamColorsWithTransparency[territory.team]
                          : "transparent"
                      }
                      stroke="black"
                      strokeWidth="2"
                    />
                  )}
                </>
              )}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
