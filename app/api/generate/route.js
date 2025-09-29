import { NextResponse } from "next/server"
import { MR_TEMPLATES } from "@/templates/mr-templates"

export async function POST(req) {
  try {
    const { template, cardDescription, extraInfo, branch, gitlabSummary } = await req.json()

    const type = template || "Feature"
    const tpl = MR_TEMPLATES[type] ?? MR_TEMPLATES.Feature

    const card = (cardDescription || "").trim()
    const userNotes = (extraInfo || "").trim()

    const sections = tpl.sections.map((s, i) => `${i + 1}. ${s}`).join("\n")

    const promptParts = [
      "You are an engineering assistant that writes clear, structured Merge Request descriptions in Markdown, act as a sr developer too my tech stack is next js with tailwind css.",
      "Use the EXACT sections and order below:",
      "",
      sections,
      "",
      "Guidance:",
      tpl.guidance,
      "- Be concise and specific for engineers and reviewers.",
      "- Prefer bullet points where helpful.",
      "- If information is missing, make minimal, reasonable assumptions.",
      "",
      "Inputs:",
      `- Template Type: ${tpl.name}`,
      `- Trello Card Description (verbatim text pasted by user): ${card}`,
      `- Extra Info (optional): ${userNotes}`,
    ]

    if (branch || gitlabSummary) {
      promptParts.push(
        "",
        "GitLab Branch and Changes:",
        branch ? `- Branch: ${branch}` : "- Branch: (not provided)",
        gitlabSummary ? gitlabSummary : "- No change summary available.",
      )
    }

    promptParts.push(
      "",
      "Output only the Markdown MR description. Do not include any preface or additional commentary.",
    )

    const prompt = promptParts.join("\n")

    // ✅ Direct API call (like your curl)
    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    )

    if (!resp.ok) {
      const err = await resp.json()
      throw new Error(err.error?.message || "Gemini API request failed")
    }

    const data = await resp.json()

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    return NextResponse.json({ text })
  } catch (err) {
    console.error("[v0] Generate route error:", err?.message) 

    return NextResponse.json(
      { error: err.message || "Failed to generate description." },
      { status: 500 },
    )
  }
}
