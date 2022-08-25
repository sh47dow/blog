import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import {supabase} from "../../utils/supabase";

const cookie: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default cookie;
