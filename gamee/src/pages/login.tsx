import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input} from "@nextui-org/input";
import DefaultLayout from "@/layouts/default";
import {useAuth} from "@/hooks/useAuth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to track error
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before each submission

    try {
      await login({name, password});
      navigate("/");
    } catch (err) {
      // Handle login failure
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <DefaultLayout>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="text-2xl font-bold">Login</div>
        </CardHeader>
        <CardBody>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                name="teamName"
                placeholder="Username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CardFooter>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded"
              >
                Login
              </button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </DefaultLayout>
  );
}
