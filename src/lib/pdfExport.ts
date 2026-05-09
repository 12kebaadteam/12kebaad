import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportToPDF = async (elementId: string, filename: string = '12kebaad-career-report.pdf') => {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(filename)
  } catch (error) {
    console.error('PDF Export Error:', error)
  }
}
