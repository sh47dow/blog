import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import {supabase} from "../../utils/supabase";

const user: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const token = req.headers.token;
  const { data: user, error } = await supabase.auth.api.getUserByCookie(req);

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(user);
};

export default user;
