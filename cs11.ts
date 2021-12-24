//%color=#444444 icon="\uf07b"
namespace IM01 {
    let sdFlag = false
    //%block="IM01 size of file %u"
    //%u.defl="log.txt"
    function sizeOfFile(u: string): number {
        u = truncateStringLength(u)
        if (sdFlag == false) {
            createFolder("CS11")
            sdFlag = true
        }
        return size(u)
    }

    //%block="IM01 remove file"
    //%u.defl="log.txt"
    export function removeFile(u: string): void {
        u = truncateStringLength(u)
        if (sdFlag == false) {
            createFolder("CS11")
            sdFlag = true
        }
        remove(u)
        return
    }

    //%block="IM01 file %u exists"
    //%u.defl="log.txt"
    export function fileExists(u: string): boolean {
        u = truncateStringLength(u)
        if (sdFlag == false) {
            createFolder("CS11")
            sdFlag = true
        }
        return exists(u)
    }

    //%block="IM01 overwrite file %u with %v"
    //%u.defl="log.txt"
    export function overwriteFile(u: string, v: string): void {
        u = truncateStringLength(u)
        file(u, v, 0x02 | 0x08)
        return
    }

    //%block="IM01 append file %u with %v"
    //%u.defl="log.txt"
    export function appendFile(u: string, v: string): void {
        u = truncateStringLength(u)
        file(u, v, 0x02 | 0x30)
        return
    }

    //%block="IM01 append file %u with line %v"
    //%u.defl="log.txt"
    export function appendFileLine(u: string, v: string): void {
        u = truncateStringLength(u)
        file(u, v + "\n", 0x02 | 0x30)
        return
    }

    //%block="IM01 read file %u"
    //%u.defl="log.txt"
    export function readFile(u: string): string {
        u = truncateStringLength(u)
        return file_read(u)
    }

    //%block="IM01 create folder %u"
    function createFolder(u: string): void {
        mkdir()
        return;
    }

    //%shim=im01::_mkdir
    function mkdir(): void {
        return
    }

    //%shim=im01::_remove
    function remove(u: string): void {
        return
    }

    //%shim=im01::_file
    function file(u: string, v: string, x: number): boolean {
        return true
    }

    //%shim=im01::_size
    function size(u: string): number {
        return 1
    }

    //%shim=im01::_exists
    function exists(u: string): boolean {
        return true
    }

    //%shim=im01::_read
    function file_read(u: string): string {
        return ""
    }

    function truncateStringLength(u: string): string {
        let i = u.indexOf(".")
        let ext = u.substr(i, u.length)
        if (i > 8) {
            u = u.substr(0, 8) + ext
        }
        return u
    }
	
	mkdir()

    
	
	
}
