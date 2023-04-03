import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: "auth",
  // @ts-ignore
  default: JSON.parse(localStorage.getItem("user")),
  effects_UNSTABLE: [persistAtom],
});

// const authTempState = atom({
//   key: "authTemp",
//   // @ts-ignore
//   default: JSON.parse(localStorage.getItem("userTemp")),
//   effects_UNSTABLE: [persistAtom],
// });

