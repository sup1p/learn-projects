import { Button } from "../../shared/ui/button";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Wrapper } from "./wrapper";
import { Profile } from "../../modules/profile/profile";
import { Posts } from "../../modules/posts/posts";
import { Settings } from "../../modules/settings/settings";

// interface User {
//   age: number;



























//   name: string;
//   hasMoney: boolean;
//   hobbies: string[];
// }

// const danik: User = {
//   age: 22,
//   name: "Danik",  
//   hasMoney: true,
//   hobbies: ["programming", "reading", "traveling"],
// };

// interface AppProps {
//   name: string;
//   age: number;
// }

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Posts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes >
  )
}
export default App;