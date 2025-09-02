import PDFDocument from "pdfkit";

export const generateStudentPDFBuffer = (student) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Helper function to draw a fully joined table
      const drawSectionTable = (title, rows, columnWidths = [150, 350]) => {
        // Section title
        doc
          .fontSize(16)
          .font('Helvetica-Bold')
          .text(title, { align: "center", underline: true })
          .moveDown(1);

        const tableLeft = 50;
        const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
        const rowHeight = 20;
        const startY = doc.y;

        // Draw top border
        doc.moveTo(tableLeft, startY)
           .lineTo(tableLeft + tableWidth, startY)
           .stroke();

        // Draw vertical borders (left, middle, right)
        doc.moveTo(tableLeft, startY)
           .lineTo(tableLeft, startY + (rowHeight * rows.length))
           .stroke()
           .moveTo(tableLeft + columnWidths[0], startY)
           .lineTo(tableLeft + columnWidths[0], startY + (rowHeight * rows.length))
           .stroke()
           .moveTo(tableLeft + tableWidth, startY)
           .lineTo(tableLeft + tableWidth, startY + (rowHeight * rows.length))
           .stroke();

        // Draw rows with connected horizontal borders
        rows.forEach(([label, value], i) => {
          const rowY = startY + (i * rowHeight);

          // Draw content
          doc.fontSize(10)
             .font('Helvetica-Bold')
             .text(label, tableLeft + 5, rowY + 5, { width: columnWidths[0] - 10 })
             .font('Helvetica')
             .text(value || '-', tableLeft + columnWidths[0] + 5, rowY + 5, { width: columnWidths[1] - 10 });

          // Draw horizontal border below row
          doc.moveTo(tableLeft, rowY + rowHeight)
             .lineTo(tableLeft + tableWidth, rowY + rowHeight)
             .stroke();
        });

        doc.moveDown(2);
      };

      // Header and Student Basic Info on first page
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text("Student Application Summary", { align: "center" })
        .moveDown(0.5)
        .fontSize(10)
        .font('Helvetica-Oblique')
        .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: "right" })
        .moveDown(2);

      // Student Basic Info Section (on first page)
      drawSectionTable("Student Basic Information", [
        ["Name", student.name],
        ["Date of Birth", student.dob ? new Date(student.dob).toLocaleDateString() : "-"],
        ["Age", student.age],
        ["Gender", student.gender],
        ["Mother Tongue", student.motherTongue],
        ["Place of Birth", student.placeOfBirth],
        ["Specially Abled", student.speciallyAbled ? "Yes" : "No"],
        ["Specially Abled Type", student.speciallyAbledType],
        ["Nationality", student.nationality],
        ["Religion", student.religion],
        ["Caste", student.caste],
        ["Subcaste", student.subcaste],
        ["Aadhar Number", student.aadharNo],
        ["Blood Group", student.bloodGroup],
        ["Allergic To", student.allergicTo],
        ["Interest", student.interest],
        ["Home Language", student.homeLanguage],
        ["Yearly Budget", student.yearlyBudget]
      ]);

      // Check if we need new page for next sections
      if (doc.y > doc.page.height - 300) {
        doc.addPage();
      }

      // Previous School and Address Info on same page
      drawSectionTable("Previous School Information", [
        ["Last School Name", student.lastSchoolName],
        ["Class Completed", student.classCompleted],
        ["Last Academic Year", student.lastAcademicYear],
        ["Reason For Leaving", student.reasonForLeaving],
        ["Board", student.board]
      ]);

      drawSectionTable("Address Information", [
        ["Present Address", student.presentAddress],
        ["Permanent Address", student.permanentAddress]
      ]);

      // New page for Parent Details
      doc.addPage();

      // Father and Mother Details on same page
      drawSectionTable("Father Details", [
        ["Name", student.fatherName],
        ["Age", student.fatherAge],
        ["Qualification", student.fatherQualification],
        ["Profession", student.fatherProfession],
        ["Annual Income", student.fatherAnnualIncome],
        ["Phone No", student.fatherPhoneNo],
        ["Aadhar No", student.fatherAadharNo],
        ["Email", student.fatherEmail]
      ]);

      drawSectionTable("Mother Details", [
        ["Name", student.motherName],
        ["Age", student.motherAge],
        ["Qualification", student.motherQualification],
        ["Profession", student.motherProfession],
        ["Annual Income", student.motherAnnualIncome],
        ["Phone No", student.motherPhoneNo],
        ["Aadhar No", student.motherAadharNo],
        ["Email", student.motherEmail]
      ]);

      // Family Information
      drawSectionTable("Family Information", [
        ["Relationship Status", student.relationshipStatus]
      ]);

      // New page for all Siblings
      if (student.siblings && student.siblings.length > 0) {
        doc.addPage();
        doc.fontSize(16)
           .font('Helvetica-Bold')
           .text("Siblings Information", { align: "center", underline: true })
           .moveDown(1);

        student.siblings.forEach((sibling, index) => {
          drawSectionTable(`Sibling ${index + 1}`, [
            ["Name", sibling.name],
            ["Age", sibling.age],
            ["Sex", sibling.sex],
            ["Institute", sibling.nameOfInstitute],
            ["Class", sibling.className]
          ]);
        });
      }

      // Footer on last page
      doc
        .fontSize(10)
        .font('Helvetica-Oblique')
        .text('This document is system generated and does not require signature.', {
          align: 'center',
          width: 500
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};