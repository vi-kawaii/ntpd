import { VK } from "vk-io";

export default async function handler(req, res) {
  const vk = new VK({
    token: req.cookies.access_token,
  });

  const keys = await vk.api.storage.getKeys();

  if (keys.length === 0) {
    res.json([]);
    return;
  }

  let content = [];

  for (const k of keys) {
    const text = await vk.api.storage.get({ key: k });
    content.push(...text);
  }

  res.json(content);
}
