import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId: string, filename: string = '12kebaad-career-report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Show loading indicator or handle state outside if needed
  try {
    // 1. Prepare the element for capture
    // Ensure it's temporarily visible and has a white background
    const originalStyle = element.style.cssText;
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.zIndex = '9999';
    element.style.background = '#ffffff';
    element.style.width = '800px'; // Fixed width for consistent PDF scale

    // 2. Capture using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800
    });

    // 3. Reset element styles
    element.style.cssText = originalStyle;

    // 4. Generate PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF Export Error:', error);
    alert("There was an error generating your PDF. Please try again or use the Print option.");
  }
};
