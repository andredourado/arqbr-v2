import { spawn } from "child_process"

const convertPdfToPng = async (command: string, file_name: string, source_directory: string, target_directory: string): Promise<any> => {
    const promise = new Promise(function(resolve) {
        const response = spawn("python3", [command, file_name, source_directory, target_directory])

        response.stdout.on('data', (data) => {
            resolve(JSON.parse(data));
        });
          
        response.stderr.on('data', (data) => {
            console.error(data.toString());
        });

    });

    const pdfDetails = await promise
    return pdfDetails[0] as any
}

export { convertPdfToPng }
