import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportToPDF = async (elementId: string, filename: string = '12kebaad-career-report.pdf') => {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const html2pdf = (await import('html2pdf.js')).default;
    
    // We explicitly tell it to avoid breaking inside our career block divs
    const opt: any = {
      margin:       10,
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        logging: true,
        letterRendering: true
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: 'css', avoid: '.career-pdf-block' }
    };

    // Use a promise to ensure capture happens after a tiny delay
    const exporter = html2pdf().set(opt).from(element);
    await exporter.save();
  } catch (error) {
    console.error('PDF Export Error:', error)
  }
}
