import { codes } from "@/types";
import axios from "axios";
import queryString from "query-string";

export const getBanksData = async (bankId: string = "") => {
  const url = queryString.stringifyUrl({
    url: `/api/banks/`,
    query: {
      bankId,
    },
  });

  const banks = await axios.get(url);

  const response = await banks.data;

  console.log(response)
  return response;

};

export const UploadBanksData = async ({
  name,
  codes,
  address,
}: {
  name: string;
  codes: codes;
  address: string;
}) => {
  const url = queryString.stringifyUrl({
    url: `/api/banks/`,
  });

  const response = await axios
    .post(url, { name: name, codes: codes, address: address })
    .then((response) => {
      return response;
    });

  return response;
};
