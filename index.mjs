import { Octokit } from "@octokit/rest";
import { parseComment } from "./helpers.mjs";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});
const defaultOptions = { owner: "nyancodeid", repo: "shortlink-labs" };

async function createLink({ short, link }) {
  const isAvailable = await getLinkByName(short);

  if (isAvailable) return Promise.reject(`Duplicate`);

  const encodedLink = Buffer.from(link).toString("base64");
  const body = `${short}:${encodedLink}`;

  const post = await octokit.rest.issues.createComment({
    ...defaultOptions,
    issue_number: 1,
    body,
  });

  if (post.status !== 201) return Promise.reject(`Invalid Response`);

  return parseComment(post.data);
}

export async function fetchLinks() {
  const issues = await octokit.rest.issues.listComments({
    ...defaultOptions,
    issue_number: 1,
  });

  if (issues.status !== 200) return [];

  return issues.data.map(parseComment).filter((valid) => !!valid);
}

async function getLinks() {
  const issues = await octokit.rest.issues.listComments({
    ...defaultOptions,
    issue_number: 1,
  });

  if (issues.status !== 200) return [];

  return issues.data.map(parseComment).filter((valid) => !!valid);
}

async function getLinkById(id) {
  const comment = await octokit.rest.issues.getComment({
    ...defaultOptions,
    comment_id: id,
  });

  if (comment.status !== 200) return null;

  return parseComment(comment.data);
}

async function getLinkByName(name) {
  const links = await getLinks();

  return links.find((link) => link.short == name);
}
