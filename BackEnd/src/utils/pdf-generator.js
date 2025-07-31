import PDFDocument from "pdfkit";

export const generateStudentPDFBuffer = (student) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Heading
      doc.fontSize(20).text("Student Application Summary", { align: "center" });
      doc.moveDown();

      const add = (label, value) => {
        doc.fontSize(12).text(`${label}: ${value ?? "-"}`);
      };

      // Student Basic Info
      add("Name", student.name);
      add("Date of Birth", student.dob ? new Date(student.dob).toLocaleDateString() : "-");
      add("Age", student.age);
      add("Gender", student.gender);
      add("Mother Tongue", student.motherTongue);
      add("Place of Birth", student.placeOfBirth);
      add("Specially Abled", student.speciallyAbled ? "Yes" : "No");
      add("Specially Abled Type", student.speciallyAbledType);
      add("Nationality", student.nationality);
      add("Religion", student.religion);
      add("Caste", student.caste);
      add("Subcaste", student.subcaste);
      add("Aadhar Number", student.aadharNo);
      add("Blood Group", student.bloodGroup);
      add("Allergic To", student.allergicTo);
      add("Interest", student.interest);
      add("Home Language", student.homeLanguage);
      add("Yearly Budget", student.yearlyBudget);

      doc.moveDown();
      doc.fontSize(14).text("Previous School Info", { underline: true });
      add("Last School Name", student.lastSchoolName);
      add("Class Completed", student.classCompleted);
      add("Last Academic Year", student.lastAcademicYear);
      add("Reason For Leaving", student.reasonForLeaving);
      add("Board", student.board);

      doc.moveDown();
      doc.fontSize(14).text("Father Details", { underline: true });
      add("Name", student.fatherName);
      add("Age", student.fatherAge);
      add("Qualification", student.fatherQualification);
      add("Profession", student.fatherProfession);
      add("Annual Income", student.fatherAnnualIncome);
      add("Phone No", student.fatherPhoneNo);
      add("Aadhar No", student.fatherAadharNo);
      add("Email", student.fatherEmail);

      doc.moveDown();
      doc.fontSize(14).text("Mother Details", { underline: true });
      add("Name", student.motherName);
      add("Age", student.motherAge);
      add("Qualification", student.motherQualification);
      add("Profession", student.motherProfession);
      add("Annual Income", student.motherAnnualIncome);
      add("Phone No", student.motherPhoneNo);
      add("Aadhar No", student.motherAadharNo);
      add("Email", student.motherEmail);

      doc.moveDown();
      add("Relationship Status", student.relationshipStatus);

      if (student.relationshipStatus !== "Married") {
        doc.moveDown();
        doc.fontSize(14).text("Guardian Details", { underline: true });
        add("Name", student.guardianName);
        add("Contact No", student.guardianContactNo);
        add("Relation to Student", student.guardianRelationToStudent);
        add("Qualification", student.guardianQualification);
        add("Profession", student.guardianProfession);
        add("Email", student.guardianEmail);
        add("Aadhar No", student.guardianAadharNo);
      }

      doc.moveDown();
      doc.fontSize(14).text("Addresses", { underline: true });
      add("Present Address", student.presentAddress);
      add("Permanent Address", student.permanentAddress);

      if (student.siblings && student.siblings.length > 0) {
        doc.moveDown();
        doc.fontSize(14).text("Siblings", { underline: true });
        student.siblings.forEach((sibling, index) => {
          doc.fontSize(12).text(`Sibling ${index + 1}:`);
          add("  Name", sibling.name);
          add("  Age", sibling.age);
          add("  Sex", sibling.sex);
          add("  Institute", sibling.nameOfInstitute);
          add("  Class", sibling.className);
          doc.moveDown();
        });
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
