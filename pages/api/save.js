import { VK } from "vk-io";

export default async function handler(req, res) {
  const vk = new VK({
    token: req.cookies.access_token,
  });

  const { key, value } = JSON.parse(req.body);

  await vk.api.storage.set({ key: key, value });

  res.end();
}
