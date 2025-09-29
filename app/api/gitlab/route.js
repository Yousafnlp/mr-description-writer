import { fetchGitlabCompare } from "@/lib/gitlab";

export async function POST(req) {
  try {
    const body = await req.json();
    const { branch, baseBranch, projectId, projectPath } = body || {};

    if (!branch || typeof branch !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing required 'branch' string in body." }),
        { status: 400 }
      );
    }

    const result = await fetchGitlabCompare({
      branch,
      baseBranch,
    });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message || "Unexpected error" }),
      { status: 500 }
    );
  }
}
