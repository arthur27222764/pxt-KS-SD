//% color="#444444" icon="\uf07b" weight=95 block="KS_SD"
namespace KS_SD {
    let sdFlag = false
    //%block="Size of file %filename"
    //%filename.defl="data.txt"
    export function sizeOfFile(filename: string): number {
        filename = truncateStringLength(filename)
        if (sdFlag == false) {
            createFolder("SD")
            sdFlag = true
        }
        return size(filename)
    }

    //%block="Remove file %filename"
    //%filename.defl="data.txt"
    export function removeFile(filename: string): void {
        filename = truncateStringLength(filename)
        if (sdFlag == false) {
            createFolder("SD")
            sdFlag = true
        }
        remove(filename)
        return
    }

    //%block="File %filename exists"
    //%filename.defl="data.txt"
    export function fileExist(filename: string): boolean {
        filename = truncateStringLength(filename)
        if (sdFlag == false) {
            createFolder("SD")
            sdFlag = true
        }
        return exists(filename)
    }

    //%block="Overwrite file %filename with %value"
    //%filename.defl="data.txt"
    export function overwriteFile(filename: string, value: string): void {
        filename = truncateStringLength(filename)
        file(filename, value, 0x02 | 0x08)
        return
    }

    //%block="Append file %filename with %value"
    //%filename.defl="data.txt"
    export function appendFile(filename: string, value: string): void {
        filename = truncateStringLength(filename)
        file(filename, value, 0x02 | 0x30)
        return
    }

    //%block="Append file %filename with line %value"
    //%filename.defl="data.txt"
    export function appendFileLine(filename: string, value: string): void {
        filename = truncateStringLength(filename)
        file(filename, value + "\n", 0x02 | 0x30)
        return
    }

    //%block="Read file %filename"
    //%filename.defl="data.txt"
    export function readFile(filename: string): string {
        filename = truncateStringLength(filename)
        return file_read(filename)
    }

    //%block="Create folder %filename"
    function createFolder(filename: string): void {
        mkdir()
        return;
    }

    //%shim=im01::_mkdir
    function mkdir(): void {
        return
    }

    //%shim=im01::_remove
    function remove(filename: string): void {
        return
    }

    //%shim=im01::_file
    function file(filename: string, v: string, x: number): boolean {
        return true
    }

    //%shim=im01::_size
    function size(filename: string): number {
        return 1
    }

    //%shim=im01::_exists
    function exists(filename: string): boolean {
        return true
    }

    //%shim=im01::_read
    function file_read(filename: string): string {
        return ""
    }

    function truncateStringLength(filename: string): string {
        let i = filename.indexOf(".")
        let ext = filename.substr(i, filename.length)
        if (i > 8) {
            filename = filename.substr(0, 8) + ext
        }
        return filename
    }
	
	mkdir()

    
	
	
}
