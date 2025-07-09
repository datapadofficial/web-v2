import axios, { AxiosRequestConfig } from "axios";

const token = process.env.NEXT_PUBLIC_UPLOADER_API_KEY || "";

const additionalConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: `https://api.bytescale.com/v2/accounts/12a1y4w/uploads/url`,
};

const uploadImageToCdnRequest = async (image_url: string) => {
  return await axios.post(
    "",
    {
      url: image_url,
    },
    additionalConfig,
  );
};

export { uploadImageToCdnRequest };
