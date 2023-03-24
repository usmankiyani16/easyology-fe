import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const authAtom = atom({
  key: "auth",
  // @ts-ignore
  default: JSON.parse(localStorage.getItem("user")),
  effects_UNSTABLE: [persistAtom],
});

const authTempAtom = atom({
  key: "authTemp",
  // @ts-ignore
  default: JSON.parse(localStorage.getItem("userTemp")),
  effects_UNSTABLE: [persistAtom],
});

export { authAtom, authTempAtom };
