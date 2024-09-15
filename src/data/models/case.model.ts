import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    lat: {
        type: Number,
        require: true
    },
    lng: {
        type: Number,
        require: true
    },
    genre: {
        type: Number,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    isSent: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

export const CaseModel = mongoose.model("Case", caseSchema);