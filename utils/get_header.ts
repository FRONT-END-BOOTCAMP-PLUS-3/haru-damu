import { cookies } from "next/headers";

const getHeader = async () => {
  const header = await cookies();
  const access_token = header.get("access_token")?.value;

  return { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` };
};

export default getHeader;
