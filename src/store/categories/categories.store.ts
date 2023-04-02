import { atom, selector, useRecoilValue } from "recoil";
import { authState } from "../auth/auth.store";
import { getApi, postApi } from "../../utils/api/api";

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: async ({ get }) => {
    const auth = get(authState);
    const userId = auth?.data?._id;
    const response = await postApi(
      `/product/all-product-category/?userId=${userId}`
    );
    console.log("response", response);
    return response;
  },
});

export const categoriesState = atom({
  key: "categories",
  default: categoriesSelector || [],
});
