import { VK } from "vk-io";

export default async function handler(req, res) {
  const vk = new VK({
    token: req.cookies.access_token,
  });

  const keys = await vk.api.storage.getKeys();

  if (keys.length === 0) {
    res.json({ newSlug: 0 });
    return;
  }

  res.json({ newSlug: Number(keys.at[-1]) + 1 });
}
