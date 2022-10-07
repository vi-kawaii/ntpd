import { VK } from "vk-io";

export default async function handler() {
  const vk = new VK({
    token: req.cookies.access_token,
  });

  const text = (await vk.api.storage.get({ key: req.query.key }))[0].value;

  res.json({ text });
}
