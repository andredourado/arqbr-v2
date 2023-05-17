import { spawn } from "child_process"

const alignmentImage = async (command: string, fileName: string, numberPages: number): Promise<boolean> => {
    const pages = []
    for (let i = 0; i < numberPages; i++) {
        pages.push(`page${i}`)
    }

    const promise = new Promise(async function(resolve, reject) {
        for await (let page of pages) {
            const response = spawn("python3", [command, fileName.slice(0, -4) + "/" + page])
    
            // response.stdout.on('data', (data) => {
            //     resolve(data.toString());
            // });
              
            response.stderr.on('data', (data) => {
                console.error(data.toString());
                reject(false)
            });
        }

        resolve(true)
    });

    const isAligned = await promise
    return isAligned as boolean
}

export { alignmentImage }
