import { generateStudentPDFBuffer } from "../utils/pdf-generator.js";
import { saveStudentPdf, getStudentPdf, getStudentPDFBuffer } from "../services/student-pdf-services.js";
import { getStudApplicationsById } from "../services/application-services.js"; // Make sure this path is correct

export const generateAndSaveStudentPdf = async (req, res) => {
  try {
    const { studId } = req.params;

    const application = await getStudApplicationsById(studId);
    if (!application) {
      return res.status(404).json({ message: "Student application not found" });
    }

    const pdfBuffer = await generateStudentPDFBuffer(application);
    const saved = await saveStudentPdf(studId, pdfBuffer);

    return res.status(201).json({
      message: "PDF generated and stored in MongoDB",
      pdfId: saved._id,
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadStudentPdf = async (req, res) => {
  try {
    const { studId } = req.params;

    const record = await getStudentPdf(studId);
    if (!record || !record.pdfFile?.data) {
      return res.status(404).json({ message: "PDF not found for this student" });
    }

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename=student_${studId}.pdf`);
    return res.send(record.pdfFile.data);
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ message: "Failed to download PDF" });
  }
};

export const viewStudentPDF = async (req, res) => {
  try {
    const { studId } = req.params;

    const pdfBuffer = await getStudentPDFBuffer(studId);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=student-application.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF View Error:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
};
