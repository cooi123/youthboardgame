import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {User} from "@/types/index";
import {useState} from "react";
import {useTeams} from "@/hooks/useTeams";
import {useEffect} from "react";
export function TeamManagementView() {
  const {teams, updateTeams, fetchTeams} = useTeams();
  console.log(teams);
  const [localTeams, setLocalTeams] = useState<User[]>([]);
  // Fetch teams when the component is mounted
  useEffect(() => {
    fetchTeams();
  }, []); // Empty dependency array ensures it runs only once

  // Update localTeams whenever teams are updated by fetchTeams
  useEffect(() => {
    if (teams.length > 0) {
      setLocalTeams(teams);
    }
  }, [teams]); // Only run when teams change

  return (
    <Card>
      <CardHeader>
        <CardHeader>Team Management</CardHeader>
      </CardHeader>
      <CardBody>
        <Table>
          <TableHeader>
            <TableColumn>Team Name </TableColumn>
            <TableColumn>Points</TableColumn>
            <TableColumn>Soldiers</TableColumn>
            <TableColumn>Shields</TableColumn>
          </TableHeader>
          <TableBody>
            {localTeams
              .filter((team) => team.role === "player")
              .map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={team.points.toString()}
                      onChange={(e) => {
                        setLocalTeams(
                          localTeams.map((t) =>
                            t.id === team.id
                              ? {...t, points: +e.target.value}
                              : t
                          )
                        );
                      }}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={team.soldier.toString()}
                      onChange={(e) => {
                        setLocalTeams(
                          localTeams.map((t) =>
                            t.id === team.id
                              ? {...t, soldier: +e.target.value}
                              : t
                          )
                        );
                      }}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={team.shield.toString()}
                      className="w-20"
                      onChange={(e) => {
                        setLocalTeams(
                          localTeams.map((t) =>
                            t.id === team.id
                              ? {...t, shield: +e.target.value}
                              : t
                          )
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button
          className="mt-4"
          color="success"
          onClick={() => updateTeams(localTeams)}
        >
          Save Changes
        </Button>
      </CardBody>
    </Card>
  );
}
