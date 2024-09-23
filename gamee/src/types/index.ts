import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Territory {
  gridNumber: number
  team: TeamColor | null;
  shield: boolean;
}

export type TeamColor = "red" | "blue" | "green" | "yellow" | "purple" | "orange" | "lightblue"

export const teamColorsWithTransparency = {
  red: "rgba(255,0,89,0.5)", // 50% transparent red
  blue: "rgba(0, 38, 143, 0.5)", // 50% transparent blue
  green: "rgba(125,222,152,0.5)", // 50% transparent green
  yellow: "rgba(244,206,89,0.5)", // 50% transparent yellow
  purple: "rgba(127,92,255,0.5) ", // 50% transparent purple
  orange: "rgba(255,140,0,0.5)", // 50% transparent orange
  lightblue: "rgba(44,228,228,0.5)", // 50% transparent pink
};

export interface Quest {
  description: string
  done: boolean
}

export interface TeamQuests {
  team: TeamColor
  quests: Quest[]
}

export interface Item {
  id: number
  name: string
  description: string
  price: number

}

export const TeamLogo = {
  red: "/TeamRed.svg",
  blue: "/TeamBlue.svg",
  green: "/TeamGreen.svg",
  yellow: "/TeamYellow.svg",
  purple: "/TeamPurple.svg",
  orange: "/TeamOrange.svg",
  lightblue: "/TeamLightBlue.svg",
}


export const allTeams: TeamColor[] = ["red", "blue", "green", "yellow", "purple", "orange", "lightblue"]

export interface User {

  name: string
  points: number
  color: TeamColor
  role: role
}

export const teamColorToId = {
  red: 1,
  blue: 2,
  green: 3,
  yellow: 4,
  purple: 5,
  orange: 6,
  lightblue: 7,
}

export type role = "player" | "admin"

export type Announcement = { message: string; day: string };