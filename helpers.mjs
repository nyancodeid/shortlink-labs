export function parseComment({ id, user, body }) {
  try {
    const [short, rawLink] = body.split(":");
    const link = {
      short,
      link: Buffer.from(rawLink, "base64").toString("utf-8"),
    };

    return {
      id,
      user: user.login,
      ...link,
    };
  } catch (err) {
    return null;
  }
}