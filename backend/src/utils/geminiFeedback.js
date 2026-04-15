import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function getGeminiFeedback(resumeText, pythonResults, jdText) {
    const { atsScore, fitScore, extractedSkills, missingSkills, atsBreakdown } = pythonResults

    const prompt = `
You are an expert career coach and resume advisor.

A candidate's resume has been analyzed. Here are the results:

ATS Score: ${atsScore}/100
${fitScore ? `Job Fit Score: ${fitScore}/100` : "No job description provided."}
Skills Found: ${extractedSkills.join(", ")}
${missingSkills?.length ? `Missing Skills for this Job: ${missingSkills.join(", ")}` : ""}
ATS Issues Detected: ${JSON.stringify(atsBreakdown)}

Resume Text:
${resumeText.slice(0, 3000)}

${jdText ? `Job Description:\n${jdText.slice(0, 1500)}` : ""}

Give specific, actionable feedback. Be direct. Do not be generic.
Return ONLY this JSON, no extra text, no markdown, no code blocks:
{
  "strengths": ["specific strength 1", "specific strength 2"],
  "weaknesses": ["specific weakness 1", "specific weakness 2"],
  "suggestions": ["specific action 1", "specific action 2"],
  "sectionFeedback": {
    "summary": "advice for summary section",
    "skills": "advice for skills section",
    "projects": "advice for projects section",
    "experience": "advice for experience section"
  },
  "overallFeedback": "2-3 sentence honest overall assessment"
}
`

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        const result = await model.generateContent(prompt)
        const text = result.response.text()

        // Gemini sometimes wraps in ```json ``` even when told not to this cleans it just in case
        const cleaned = text.replace(/```json|```/g, "").trim()

        return JSON.parse(cleaned)
    } catch (error) {
        // if Gemini fails we will return basic fallback so analysis still works
        return {
            strengths: [],
            weaknesses: [],
            suggestions: ["Could not generate AI feedback at this time."],
            sectionFeedback: {
                summary: "",
                skills: "",
                projects: "",
                experience: ""
            },
            overallFeedback: "AI feedback unavailable. Please try again."
        }
    }
}

export default getGeminiFeedback