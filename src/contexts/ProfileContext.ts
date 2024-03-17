import { createContext } from "react";
import { ProfileType } from "../components/service";

const ProfileContext = createContext<ProfileType | undefined>(undefined);

export default ProfileContext;