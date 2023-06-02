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
  
export const extractBySearchTextGetLine = (text, field) => {
  let targetLine = ''
  const lines = text.replace(/(^[ \t]*\n)/gm, "").split("\n")

  const output = []
  lines.map((line: string) => {
    if (line.includes(field)) {
      const lineBreak = line.split(line, field)
      console.log(lineBreak)
      output.push(lineBreak[1])
    }
  })

  // for (let index = 0; index < lines.length; index++) {
  //   field.search_text.forEach(searchText => {
  //     if (lines[index].toUpperCase().includes(searchText.toUpperCase())) {
  //       targetLine = lines[index + field.line]
  //       return
  //     }
  //   })

  //   if (targetLine !== '') {
  //     break
  //   }
  // }

  // let tempResult = ''

  // if (typeof field.extraction_start === 'string' || field.extraction_start instanceof String) {
  //   let tempResult = targetLine.substring(targetLine.indexOf(field.extraction_start) + field.extraction_start.length, field.extraction_length).trim()

  //   tempResult = tempResult.replace(/[|!;\[\]]/g, '')

  //   if (tempResult.includes(field.extraction_start)) {
  //     tempResult = tempResult.substring(tempResult.indexOf(field.extraction_start) + field.extraction_start.length, field.extraction_length).trim()
  //   }
    
  //   if (tempResult.includes('   ')) {
  //     tempResult = tempResult.substring(tempResult.indexOf('   ') + 3, field.extraction_length).trim()
  //   }
  // } else {
  //   let tempResult = targetLine.substring(field.extraction_start + field.extraction_start.length, field.extraction_length).trim()

  //   tempResult = tempResult.replace(/[|!;\[\]]/g, '')
    
  //   if (tempResult.includes('   ')) {
  //     tempResult = tempResult.substring(tempResult.indexOf('   ') + 3, field.extraction_length).trim()
  //   }
  // }

  return output
}

