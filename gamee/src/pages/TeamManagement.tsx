import {ItemManagement} from "@/components/ItemManagement";
import DefaultLayout from "@/layouts/default";
import {TeamManagementView} from "@/components/TeamManagement";
import {Tabs, Tab} from "@nextui-org/tabs";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useTeams} from "@/hooks/useTeams";
import {QuestManagement} from "@/components/QuestsManagement";
export default function TeamManagementPage() {
  //   const navigate = useNavigate();
  //   const {user} = useAuth();
  //   console.log(user);
  //   if (!user || user.role.toString() !== "admin") {
  //     navigate("/");
  //   }

  const {teams} = useTeams();
  return (
    <DefaultLayout>
      <Tabs aria-label="Options">
        <Tab key="team" title="Team Management">
          <TeamManagementView />
        </Tab>
        <Tab key="Item" title="Item Management">
          <ItemManagement />
        </Tab>
        <Tab key="quest" title="Quest Management">
          <QuestManagement teams={teams} />
        </Tab>
      </Tabs>
    </DefaultLayout>
  );
}
