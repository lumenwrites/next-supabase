import { supabase } from "backend/supabase";

// Every time user logs in or out in AuthContext, I make request to this route to set a cookie
// So that later I can access supabase user in other api routes
const handler = async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
