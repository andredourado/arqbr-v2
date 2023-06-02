export const extractByRegex = (text, pattern, occurence=0) => {
  const patterns = {
    'mm/yyyy': /\b(\[\s*\d{1,2}\s*\/\s*\d{4}\]\d|\]\d{1,2}\s*\/\s*\d{4}\[|\[\s*\d{1,2}\s*\/\s*\d{2}\]\d|\]\d{1,2}\s*\/\s*\d{2}\[)\b|\b(\d{1,2}\s*\/\s*\d{4}|\[\s*\d{1,2}\s*\/\s*\d{2}\]\d)\b/g,
    'long_date': /(\w+-\w+|\w+),?\s+(\d{1,2})\s+de\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+(\d{4})/g,
  } 

  const regex = patterns[pattern]
  const matches = []
  let match = []

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0])
  }

  if (matches.length > 0) {
    return matches[occurence]
  } else {
    return ''
  }
}
  
export const extractBySearchTextGetLine = (text: string, {
  texto,
  linha,
  inicio,
  comprimento
}) => {
  const lines = text.replace(/(^[ \t]*\n)/gm, "").split("\n")

  const output = []
  lines.map((line: string, index: number) => {
    let lineIndex 
    if (line.includes(texto)) {
      lineIndex = index + linha
      const occurenceIndex = line.indexOf(inicio)
      const word = lines[lineIndex].substring(occurenceIndex, occurenceIndex + comprimento)
      output.push(word)
    }
  })

 return output
}

