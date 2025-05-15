
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return <HeaderClient convexUser={convexUser} />;
};

export default Header;
