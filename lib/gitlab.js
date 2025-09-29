async function fetchGitlabCompare(opts) {
  const token = process.env.GITLAB_ACCESS_TOKEN;
  const envProjectId = process.env.GITLAB_PROJECT_ID;
  const envProjectPath = process.env.GITLAB_PROJECT_PATH;
  const baseUrl = "https://gitlab.com";

  if (!token) {
    throw new Error("Missing GITLAB_ACCESS_TOKEN environment variable.");
  }

  const fromRef = opts.branch;
  const toRef = opts.baseBranch || "main";
  console.log(envProjectId);
  // Compare API
  const compareUrl = `${baseUrl}/api/v4/projects/${envProjectId}/repository/compare?from=${encodeURIComponent(
    fromRef
  )}&to=${encodeURIComponent(toRef)}&straight=false`;

  const compareRes = await fetch(compareUrl, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!compareRes.ok) {
    const body = await compareRes.text();
    throw new Error(`GitLab compare failed: ${compareRes.status} ${body}`);
  }

  const cmpData = await compareRes.json();

  const changedFiles = (cmpData.diffs || []).map((d) => {
    let status = "modified";
    if (d.new_file) status = "added";
    else if (d.deleted_file) status = "deleted";
    else if (d.renamed_file) status = "renamed";

    return {
      path: d.new_path || d.old_path,
      status,
    };
  });

  return {
    branch: opts.branch,
    baseBranch: toRef,
    changes: cmpData || [],
    changedFiles,
  };
}

module.exports = { fetchGitlabCompare };
