import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null, // if null, means guest
    },
    resumeFileName: String,
    resumeText: String,
    jobDescription: String,

    // From Python (calculated)
    atsScore: Number, // 0-100, rule-based
    fitScore: {
        type: Number,
        default: null
    }, // 0-100, cosine similarity (null if no JD)
    extractedSkills: [String],  // spaCy extracted
    matchedSkills: {
        type: [String],
        default: null
    },
    missingSkills: {
        type: [String],
        default: null
    },

    // detailed ATS scoring breakdown
    atsBreakdown: {
        contactInfo: Number,
        sectionCompleteness: Number,
        impactAndMetrics: Number,
        lengthOptimization: Number,
        readability: Number
    },

    // From Gemini
    strengths: [String],
    weaknesses: [String],
    suggestions: [String], // actionable, specific
    sectionFeedback: { // per section advice
        summary: String,
        skills: String,
        projects: String,
        experience: String,
    },
    overallFeedback: String,
},
{
    timestamps: true
})

const Analysis = mongoose.model("Analysis", analysisSchema)

export default Analysis;