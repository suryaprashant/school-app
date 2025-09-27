/**
 * Generate and save a student's PDF
 * @route POST /api/users/pdf/generate/:studId
 */
export const generateAndSaveStudentPdf = async (req, res) => {
  try {
    const { studId } = req.params;
    
    // Get student data
    const student = await getStudentService(studId);
    if (!student) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found"
      });
    }

    // Generate PDF buffer
    const pdfBuffer = await generateStudentPDF(student);
    
    // Save to database
    const pdfDoc = await StudentPDF.findOneAndUpdate(
      { studentId: studId },
      { 
        studentId: studId,
        pdfData: pdfBuffer,
        generatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      status: "success",
      message: "PDF generated and saved successfully",
      data: {
        pdfId: pdfDoc._id,
        generatedAt: pdfDoc.generatedAt
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to generate PDF",
      error: error.message
    });
  }
};

/**
 * View a student's PDF
 * @route GET /api/users/pdf/view/:studId
 */
export const viewStudentPDF = async (req, res) => {
  try {
    const { studId } = req.params;
    
    // Find the PDF in the database
    const pdfDoc = await StudentPDF.findOne({ studentId: studId });
    
    if (!pdfDoc) {
      return res.status(404).json({
        status: "failed",
        message: "PDF not found. Please generate it first."
      });
    }

    // Set the content type to PDF
    res.contentType("application/pdf");
    res.send(pdfDoc.pdfData);
  } catch (error) {
    console.error("Error viewing PDF:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve PDF",
      error: error.message
    });
  }
};

/**
 * Download a student's PDF
 * @route GET /api/users/pdf/download/:studId
 */
export const downloadStudentPdf = async (req, res) => {
  try {
    const { studId } = req.params;
    
    // Find the PDF in the database
    const pdfDoc = await StudentPDF.findOne({ studentId: studId });
    
    if (!pdfDoc) {
      return res.status(404).json({
        status: "failed",
        message: "PDF not found. Please generate it first."
      });
    }

    // Set headers for file download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=student_${studId}_${new Date(pdfDoc.generatedAt).toISOString().split('T')[0]}.pdf`
    );
    res.contentType("application/pdf");
    res.send(pdfDoc.pdfData);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to download PDF",
      error: error.message
    });
  }
};
