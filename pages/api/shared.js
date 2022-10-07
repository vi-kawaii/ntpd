import { VK } from "vk-io";

export default async function handler(req, res) {
  const vk = new VK({
    token: process.env.VK_SERVICE_TOKEN,
  });

  const user = await vk.api.users.get({
    user_ids: [req.query.user_id],
    fields: ["photo_50"],
    lang: "ru"
  });

  const text = (
    await vk.api.storage.get({
      user_id: req.query.user_id,
      key: req.query.key,
    })
  )[0].value;

  res.json({ text, user: user[0] });
}
