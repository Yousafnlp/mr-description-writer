"use client";
import { React, useState } from "react";
import useSWRMutation from "swr/mutation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { postJSON, summarizeGitlab } from "@/lib/utils";

// helper

export default function MrForm() {
  const [template, setTemplate] = useState("Feature");
  const [cardDescription, setCardDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [output, setOutput] = useState("");
  const [branch, setBranch] = useState("dev");
  const [baseBranch, setBaseBranch] = useState("");
  const [gitlabPreview, setGitlabPreview] = useState(null);

  const { trigger: generate, isMutating: isGenerating } = useSWRMutation(
    "/api/generate",
    postJSON
  );
  const { trigger: fetchCompare, isMutating: isFetchingCompare } =
    useSWRMutation("/api/gitlab", postJSON);

  async function handleFetchChanges() {
    setGitlabPreview(null);
    if (!branch.trim()) {
      alert("Please enter a branch name first.");
      return;
    }
    try {
      const res = await fetchCompare({
        branch: branch.trim(),
        baseBranch: baseBranch.trim() || undefined,
      });
      const commits = res?.changes?.commits?.length;
      const changedFiles = res?.changedFiles;
      setGitlabPreview({
        branch: res.branch,
        baseBranch: res.baseBranch,
        commits,
        changedFiles,
      });
    } catch (err) {
      alert(err?.message || "Failed to fetch GitLab changes.");
    }
  }

  async function handleGenerate() {
    setOutput("");
    try {
      const gitlabSummary = gitlabPreview ? summarizeGitlab(gitlabPreview) : "";
      const payload = {
        template,
        cardDescription,
        extraInfo,
        branch: branch.trim() || undefined,
        gitlabSummary: gitlabSummary || undefined,
      };
      const { text } = await generate(payload);
      setOutput(text);
    } catch (err) {
      alert(err?.message || "Failed to generate description.");
    }
  }

  return (
    <div className="grid gap-6">
      {/* Template Selector */}
      <div className="grid gap-2">
        <Label htmlFor="template">Template</Label>
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger id="template" className="w-full">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Feature">Feature</SelectItem>
            <SelectItem value="Bugfix">Bugfix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GitLab Branch */}
      <div className="grid gap-2">
        <Label htmlFor="branch">GitLab Branch</Label>
        <div className="grid gap-2 md:grid-cols-2">
          <Input
            id="base-branch"
            placeholder="feature/my-branch"
            value={baseBranch}
            onChange={(e) => setBaseBranch(e.target.value)}
          />
          <Input
            id="branch"
            placeholder="base branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleFetchChanges}
            disabled={isFetchingCompare || !branch.trim() || !baseBranch.trim()}
          >
            {isFetchingCompare ? "Fetching changes..." : "Fetch Changes"}
          </Button>
        </div>
        {gitlabPreview && (
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">{`Comparing  ${gitlabPreview.baseBranch} ->  ${gitlabPreview.branch}`}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {gitlabPreview.commits} commits •{" "}
              {gitlabPreview.changedFiles?.length} changed files
            </p>
          </div>
        )}
      </div>

      {/* Trello Card Description */}
      <div className="grid gap-2">
        <Label htmlFor="card-desc">Trello Card Description</Label>
        <Textarea
          id="card-desc"
          placeholder="Paste the full Trello card description here..."
          className="min-h-40"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Paste the card description text (title and labels are optional and can
          be added via Extra Information).
        </p>
      </div>

      {/* Extra Info */}
      <div className="grid gap-2">
        <Label htmlFor="extra">Extra Information</Label>
        <Textarea
          id="extra"
          placeholder="Add any additional context, edge cases, acceptance criteria, labels, or notes."
          className="min-h-32"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || !cardDescription.trim() || !gitlabPreview}
        >
          {isGenerating ? "Generating..." : "Generate Description"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setCardDescription("");
            setExtraInfo("");
            setOutput("");
          }}
        >
          Reset
        </Button>
      </div>

      {/* Output */}
      <div className="grid gap-2">
        <Label htmlFor="output">Generated MR Description</Label>
        <Textarea
          id="output"
          className="min-h-48 font-mono text-sm"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(output)}
            disabled={!output}
          >
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
}
