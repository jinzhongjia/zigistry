//!===============================================================
//!       Show Library "/packages/[user]/[...projectName]"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This page is used to display the details of a
//! single library.
//!===============================================================

// ===================
//       Imports
// ===================

// ----------- Types -----------
import Repo from '@/types/customTypes';
import { marked } from 'marked';

// --------- Functions ---------
import { SiCodeberg } from "react-icons/si";
import DOMPurify from 'isomorphic-dompurify';

// --------- Database ---------
import data from "@/database/programs.json";
import bergdb from "@/database/codebergPrograms.json";

// -------- Components ---------
import Image from 'next/image';
import { FaCheck } from "react-icons/fa";
import { GoIssueOpened } from 'react-icons/go';
import { FaCodeFork, FaEye, FaStar } from 'react-icons/fa6';
import { Button, Card, Tooltip, Badge } from 'flowbite-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Clipboard } from "flowbite-react"
import { highlight_bash_code, highlight_zig_diff_code, numberAsLetters } from '@/backend/helperFunctions';
import { highlight_zig_code } from '@/backend/helperFunctions';

// =========================================================================
//       Exports show library page "/packages/[user]/[projectName]"
// =========================================================================
export default function Manage({ compressedRepo }: { compressedRepo: Repo }) {
  function highlight() {
    const ZigCodeContainers: any = document.getElementsByClassName('language-zig');
    for (let pre of ZigCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_zig_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const ZigDiffCodeContainers: any = document.getElementsByClassName('language-diff');
    for (let pre of ZigDiffCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_zig_diff_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const ZonCodeContainers: any = document.getElementsByClassName('language-zon');
    for (let pre of ZonCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_zig_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const BashCodeContainers: any = document.getElementsByClassName('language-shell');
    for (let pre of BashCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_bash_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const ShCodeContainers: any = document.getElementsByClassName('language-sh');
    for (let pre of ShCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_bash_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
  };
  return (
    <>
      {compressedRepo.contentIsCorrect ? (
        <>
          <div className='flex justify-center items-center' onLoad={highlight}>
            <Card className="w-72 my-5 transition-transform transform-cpu">
              <Image width="50" height="50" className="w-10 rounded-full" src={compressedRepo.avatar_url} alt={compressedRepo.name} />
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                {compressedRepo.name}
              </h5>
              <p className="text-gray-400">{compressedRepo.full_name}
              </p>
              <div className="flex space-x-3">
                {compressedRepo.archived ? <Badge color={"light"} className="w-fit dark:bg-yellow-400 bg-white dark:border-none border-slate-200 border mt-1">Archived</Badge> : <></>}
                <Badge color={"darkblue"} className="w-fit dark:bg-slate-600 bg-white dark:border-none border-slate-200 border mt-1">{compressedRepo.license}</Badge>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {compressedRepo.description}
              </p>
              <div className="flex items-center">
                <FaStar size={20} color="#cfbc0e" className="mr-2" />
                {numberAsLetters(compressedRepo.stargazers_count)}
                <FaEye className="ml-2 mr-1" color="skyblue" />
                {numberAsLetters(compressedRepo.watchers_count)}
                <FaCodeFork className="ml-2 mr-1" color="lightpink" />
                {numberAsLetters(compressedRepo.forks_count)}
                <GoIssueOpened className="ml-2 mr-1" color="lightgreen" />
                {numberAsLetters(compressedRepo.open_issues)}
                <BsInfoSquareFill className="ml-2 mr-1" color="darkorange" />
                <Tooltip className="ml-2 mr-1" content={compressedRepo.topics?.join(", ")}>
                  {compressedRepo.topics?.length}
                </Tooltip>
              </div>
              <div className="flex">
                {compressedRepo.has_build_zig_zon ? <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 flex justify-center items-center space-x-3 w-min">build.zig.zon&nbsp;<FaCheck size={12} /></span> : ""}
                {compressedRepo.has_build_zig ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 flex justify-center items-center space-x-3 w-min">build.zig&nbsp;<FaCheck size={12} /></span> : ""}
                {compressedRepo.fork ? <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300 flex justify-center items-center space-x-3 w-min">fork&nbsp;<FaCheck size={12} /></span> : ""}
              </div>
              <Button as={Link} target='_blank' rel="noreferrer" href={compressedRepo.berg ? "https://codeberg.org/" + compressedRepo.full_name : "https://github.com/" + compressedRepo.full_name} color="light" pill>
                {compressedRepo.berg ? <>View on CodeBerg &nbsp;<SiCodeberg size={20} /></> : <>View on GitHub &nbsp;<FaGithub size={20} /></>}
              </Button>
            </Card>
          </div>
          <div className='flex flex-wrap gap-2 mb-4 justify-center'>
            <Badge color="info">Updated: {new Date(compressedRepo.updated_at).toLocaleTimeString() + " " + new Date(compressedRepo.updated_at).toDateString()}</Badge>
            <Badge color="warning">Size: {compressedRepo.size}KB</Badge>
            <Badge color="purple">Created: {new Date(compressedRepo.created_at).toLocaleTimeString() + " " + new Date(compressedRepo.created_at).toDateString()}</Badge>
          </div>
          <div className='w-full mb-4 flex justify-center items-center'>
            <Badge className='w-fit' color="blue">Dependencies:</Badge>
          </div>
          <div className='w-full flex justify-center items-center'>
            <div className='w-3/5 flex flex-wrap gap-2 mb-4 justify-center'>
              {compressedRepo.dependencies ? (
                compressedRepo.dependencies.map((element, index) => (
                  <Badge key={index} color="dark">{element}</Badge>
                ))
              ) : (
                <Badge color="dark">No known dependencies</Badge>
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4'>
            <div className="dark:bg-slate-800 bg-white border-2 border-slate-600 sm:w-3/5 w-4/5 rounded-2xl py-10 sm:px-20 px-10">
              <div className="readmeDiv" dangerouslySetInnerHTML={{ __html: compressedRepo.readme_content ? DOMPurify.sanitize(compressedRepo.readme_content) : "" }}>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>404</>
      )}
    </>
  );
}


function removeComments(input: string) {
  // Match strings and comments separately
  return input.replace(/("(?:\\.|[^"\\])*")|\/\/.*|\/\*[\s\S]*?\*\//g, (match, stringMatch) => {
    // If it's a string, return it unchanged
    if (stringMatch !== undefined) {
      return stringMatch;
    }
    // Otherwise, it's a comment, so remove it
    return '';
  });
}
// ---------- Concatenate the database into a single list -------------
const repositories: Repo[] = [...bergdb, ...data];

// ==================================
//       Get Server Side Props
// ==================================
export async function getServerSideProps({ params: { user, projectName } }: { params: { user: string; projectName: string; } }) {
  // ------------ Get user's paths ----------------
  const repoPath = `${user}/${projectName}`;

  // ------------ Find the repo ---------------
  const repository: Repo | undefined = repositories.find(repo => repo.full_name === repoPath);

  if (!repository) {
    return { props: { compressedRepo: { contentIsCorrect: false } as Repo } };
  }

  // ------------ Get the correct readme.md ---------------
  const fetchReadmeContent = async (repo: Repo) => {
    const extensions = ["", "txt", "md"] as const;
    const defaultBranch = repo.default_branch || 'main';
    const readmeCasing = ["readme", "README"];

    for (let ext of extensions) {
      for (let readmeCase of readmeCasing) {
        var url = "";
        if (repository.berg && repository.berg == 1) {
          url = `https://codeberg.org/${repo.full_name}/raw/branch/${defaultBranch}/${readmeCase}${ext && `.${ext}`}`
        } else {
          url = `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/${readmeCase}${ext && `.${ext}`}`
        }
        let response = await fetch(url, { method: "HEAD" });

        if (response.ok) {
          response = await fetch(url);
          return { content: await response.text(), ext: ext };
        }
      }
    }

    return { content: "404", ext: "" };
  };

  // ----------- Fetch the readme and tags --------------
  const [readmeContent] = await Promise.all([
    fetchReadmeContent(repository),
  ]);
  var dependencies: string[] = [];
  if (repository.has_build_zig_zon == 1) {
    const url = `https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch || "master"}/build.zig.zon`;
    // console.log(url)
    const res = await fetch(url);
    var input = await res.text();
    // Replace .{ with {
    input = removeComments(input)

    // input = input.replace(/\/\/.*$/gm, ''); // Remove single-line comments
    input = input.replace(/\.{/, '{');

    // Replace .field = "value" with "field": "value"
    input = input.replace(/\.([a-zA-Z0-9_-]+)\s*=\s*/g, '"$1": ');

    // Handle the @"raylib-zig" case
    input = input.replace(/\.\@"([\w\-\.]+)"\s*=\s*\./g, '"$1": ')

    // Replace arrays in the format .{ "value1", "value2", ... } with [ "value1", "value2", ... ]
    input = input.replace(/\.{\s*("[^"]*"\s*,?\s*)+\s*}/g, match => {
      return match
        .replace(/\.{/, '[')
        .replace(/}\s*$/, ']')
        .replace(/,\s*]/, ']'); // Remove the trailing comma before closing ]
    });

    // Remove extra dots before opening braces
    input = input.replace(/\.\s*\{/g, '{');

    // Remove commas after the last element in objects or arrays (JSON doesn't allow trailing commas)
    input = input.replace(/,(\s*[}\]])/g, '$1');
    // console.log(input);
    try {
      const json_parsed = await JSON.parse(input);
      const results = Object.keys(json_parsed.dependencies);
      for (let key of results) {
        dependencies.push(key);
      }
    } catch { }
  }
  if (dependencies.length === 0) {
    dependencies = ["No dependencies were found"]
  }
  // ----------- Get the tag details -------------
  // ------------ Generate the compressed repository -----------------
  const compressedRepo: Repo = {
    contentIsCorrect: true,
    name: repository.name,
    full_name: repository.full_name,
    readme_content: readmeContent.ext === "md" ? await marked(readmeContent.content) : `<pre style="padding: 0 !important; border: 0 !important;">${readmeContent.content}</pre>`,
    created_at: repository.created_at,
    description: repository.description,
    tags_url: repository.tags_url,
    open_issues: repository.open_issues,
    license: repository.license,
    stargazers_count: repository.stargazers_count,
    forks_count: repository.forks_count,
    dependencies: dependencies,
    watchers_count: repository.watchers_count,
    avatar_url: repository.avatar_url,
    size: repository.size,
    fork: repository.fork,
    has_build_zig: repository.has_build_zig,
    berg: repository.berg ? 1 : 0,
    has_build_zig_zon: repository.has_build_zig_zon,
    updated_at: repository.updated_at,
  };

  return { props: { compressedRepo } };
}



// // 
// // 
// // 
// // 
// var url = "";
// if (repository.berg && repository.berg == 1) {
//   url = `https://codeberg.org/${repo.full_name}/raw/branch/${defaultBranch}/${readmeCase}${ext && `.${ext}`}`
// } else {
//   url = `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/${readmeCase}${ext && `.${ext}`}`
// }