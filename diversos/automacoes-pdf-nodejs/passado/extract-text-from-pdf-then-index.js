const pdfjsLib = require('pdfjs-dist/legacy/build/pdf')
const { createCanvas } = require('canvas')
const { createWorker } = require('tesseract.js')


function extractCNPJ(text) {
  // const regex = /(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/g
  const regex = /\b\d{2}[-. ]?\d{3}[-. ]?\d{3}\/\d{4}[-. ]?\d{2}\b/g
  const matches = []
  let match

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0])
  }

  return matches
}

async function readPdfFile(filepath) {
  const pdf = await pdfjsLib.getDocument(filepath).promise
  const numPages = pdf.numPages
  
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i)

    const viewport = page.getViewport({ scale: 5.0 })
    const canvas = createCanvas(viewport.width, viewport.height)
    const canvasContext = canvas.getContext('2d')

    const renderContext = {
      canvasContext,
      viewport,
    }
    
    await page.render(renderContext).promise

    const image = canvas.toDataURL('image/png')

    const worker = await createWorker()
    await worker.loadLanguage('por')
    await worker.initialize('por')

    const { data: { text } } = await worker.recognize(image, {
      tessedit_create_txt: '1',
      tessedit_create_hocr: '0',
      config: 'hocr',
      preserve_interword_spaces: '1'
    });
    console.log(`Page ============================================ ${i}: ${text}`)
    console.log('>>>>>>> ' + extractCNPJ(text))
    await worker.terminate()
  }
}

//readPdfFile('./arquivos-pdf/ARQBRCX03-000000287.pdf')
readPdfFile('./arquivos-pdf/ARQBRCX01-000000153.pdf')

