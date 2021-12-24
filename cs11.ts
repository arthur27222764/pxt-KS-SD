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

    /*
    IM01 LEDS functions
    */

    let enable1: boolean = true
    let enable2: boolean = true
    let enable3: boolean = true
    let enable4: boolean = true
    let enable5: boolean = true

    //%blockId="turn_off_leds" block="IM01 turn off all leds"
    //%weight=50 blockGap=8
    //%group="LED OFF"
    export function turn_off_leds() {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }

    //%blockId="turn_off_blink" block="IM01 turn off blinking"
    //%weight=50 blockGap=8
    //%group="LED OFF"
    export function turn_off_blink() {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)

        enable1 = false
        enable2 = false
        enable3 = false
        enable4 = false
        enable5 = false
    }

    //%blockId="turn_on_green_led" block="IM01 turn on green LED"
    //%group="LED ON"
    //%weight=30 blockGap=8
    export function turn_on_green_led() {
        pins.analogWritePin(AnalogPin.P8, (1023 * 128) / 255)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }

    //%blockId="turn_on_blue_led" block="IM01 turn on blue LED"
    //%group="LED ON"
    //%weight=28 blockGap=8
    export function turn_on_blue_led() {
        pins.analogWritePin(AnalogPin.P2, (1023 * 128) / 255)
        pins.digitalWritePin(DigitalPin.P8, 0)
    }

    //%blockId="turn_on_green_led_with_intensity" block="IM01 turn on green LED with intensity %intensity"
    //%group="LED ON"
    //%intensity.min=0 intensity.max=255 intensity.defl=128
    //%weight=26 blockGap=8
    export function turn_on_green_led_with_intensity(intensity: number) {
        pins.analogWritePin(AnalogPin.P8, (1023 * intensity) / 255)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }

    //%blockId="turn_on_blue_led_with_intensity" block="IM01 turn on blue LED with intensity %intensity"
    //%group="LED ON"
    //%intensity.min=0 intensity.max=255 intensity.defl=128
    //%weight=24 blockGap=8
    export function turn_on_blue_led_with_intensity(intensity: number) {
        pins.analogWritePin(AnalogPin.P2, (1023 * intensity) / 255)
        pins.digitalWritePin(DigitalPin.P8, 0)
    }

    //%blockId="turn_on_blue_green_led" block="Turn On LED with G %g_value and B %b_value"
    //%weight=22 blockGap=8
    //%group="LED ON"
    //%g_value.min=0 g_value.max=255 g_value.defl=125
    //%b_value.min=0 b_value.max=255 b_value.defl=128
    export function turn_on_blue_green_led(g_value: number, b_value: number) {
        pins.analogWritePin(AnalogPin.P8, (1023 * g_value) / 255)
        pins.analogWritePin(AnalogPin.P2, (1023 * b_value) / 255)
    }

    //%blockId="wink_green_led" block="IM01 wink green LED"
    //%weight=20 blockGap=8
    //%group="WINK"
    export function wink_green_led() {
        pins.analogWritePin(AnalogPin.P8, (1023 * 128) / 255)
        pins.digitalWritePin(DigitalPin.P2, 0)

        basic.pause(500)

        pins.analogWritePin(AnalogPin.P8, (1023 * 0) / 255)

        basic.pause(500)
    }

    //%blockId="wink_blue_led" block="IM01 wink blue LED "
    //%weight=18 blockGap=8
    //%group="WINK"
    export function wink_blue_led() {
        pins.analogWritePin(AnalogPin.P2, (1023 * 128) / 255)
        pins.digitalWritePin(DigitalPin.P8, 0)

        basic.pause(500)

        pins.analogWritePin(AnalogPin.P2, (1023 * 0) / 255)

        basic.pause(500)
    }

    //%blockId="wink_green_led_dur" block="IM01 wink green LED for %dur ms"
    //%dur.defl=250
    //%weight=16 blockGap=8
    //%group="WINK"
    export function wink_green_led_dur(dur: number) {
        pins.analogWritePin(AnalogPin.P8, (1023 * 128) / 255)
        pins.digitalWritePin(DigitalPin.P2, 0)

        basic.pause(dur / 2)

        pins.analogWritePin(AnalogPin.P8, (1023 * 0) / 255)

        basic.pause(dur / 2)
    }

    //%blockId="wink_blue_led_dur" block="IM01 wink blue LED for %dur ms"
    //%dur.defl=250
    //%weight=14 blockGap=8
    //%group="WINK"
    export function wink_blue_led_dur(dur: number) {
        pins.analogWritePin(AnalogPin.P2, (1023 * 128) / 255)
        pins.digitalWritePin(DigitalPin.P8, 0)

        basic.pause(dur / 2)

        pins.analogWritePin(AnalogPin.P2, (1023 * 0) / 255)

        basic.pause(dur / 2)
    }

    //%blockId="wink_blue_green_led" block="IM01 wink blue %b_value green %g_value LED for %dur ms"
    //%dur.defl=250
    //%weight=12 blockGap=8
    //%b_value.min=0 b_value.max=255 b_value.defl=128
    //%g_value.min=0 g_value.max=255 g_value.defl=128
    //%group="WINK"
    export function wink_blue_green_led(b_value: number, g_value: number, dur: number) {
        pins.analogWritePin(AnalogPin.P8, (1023 * g_value) / 255)
        pins.analogWritePin(AnalogPin.P2, (1023 * b_value) / 255)

        basic.pause(dur / 2)

        pins.analogWritePin(AnalogPin.P8, (1023 * 0) / 255)
        pins.analogWritePin(AnalogPin.P2, (1023 * 0) / 255)

        basic.pause(dur / 2)
    }

    //%blockId="blink_green_led" block="IM01 blink green LED"
    //%weight=10 blockGap=8
    //%group="BLINK"
    export function blink_green_led() {
        enable1 = true

        control.inBackground(function () {
            while (enable1 == true) {
                pins.analogWritePin(AnalogPin.P8, (1023 * 128) / 255)
                pins.digitalWritePin(DigitalPin.P2, 0)

                basic.pause(500)

                pins.analogWritePin(AnalogPin.P8, (1023 * 0) / 255)

                basic.pause(500)
            }
        })
    }

    //%blockId="blink_blue_led" block="IM01 blink blue LED"
    //%weight=8 blockGap=8
    //%group="BLINK"
    export function blink_blue_led() {
        enable2 = true

        control.inBackground(function () {
            while (enable2 == true) {
                pins.analogWritePin(AnalogPin.P2, (1023 * 128) / 255)
                pins.digitalWritePin(DigitalPin.P8, 0)

                basic.pause(500)

                pins.analogWritePin(AnalogPin.P2, (1023 * 0) / 255)

                basic.pause(500)
            }
        })
    }

    //%blockId="bink_green_led_period" block="IM01 blink green LED with period %dur ms"
    //%dur.defl=500
    //%weight=6 blockGap=8
    //%group="BLINK"
    export function blink_green_led_period(dur: number) {
        enable3 = true

        control.inBackground(function () {
            while (enable3 == true) {
                pins.analogWritePin(AnalogPin.P8, (1023 * 128) / 255)
                pins.digitalWritePin(DigitalPin.P2, 0)

                basic.pause(dur / 2)

                pins.analogWritePin(AnalogPin.P8, (1023 * 0) / 255)

                basic.pause(dur / 2)
            }
        })
    }

    //%blockId="blink_blue_led_period" block="IM01 blink blue LED with period %dur ms"
    //%dur.defl=500
    //%weight=4 blockGap=8
    //%group="BLINK"
    export function blink_blue_led_period(dur: number) {
        enable4 = true

        control.inBackground(function () {
            while (enable4 == true) {
                pins.analogWritePin(AnalogPin.P2, (1023 * 128) / 255)
                pins.digitalWritePin(DigitalPin.P8, 0)

                basic.pause(dur / 2)

                pins.analogWritePin(AnalogPin.P2, (1023 * 0) / 255)

                basic.pause(dur / 2)
            }
        })
    }

    //%blockId="blink_blue_green_led" block="IM01 blink blue %b_value green %g_value LED with period %dur ms"
    //%dur.defl=500
    //%weight=2 blockGap=8
    //%b_value.min=0 b_value.max=255 b_value.defl=128
    //%g_value.min=0 g_value.max=255 g_value.defl=128
    //%group="BLINK"
    export function blink_blue_green_led(b_value: number, g_value: number, dur: number) {
        enable5 = true

        control.inBackground(function () {
            while (enable5 == true) {
                pins.analogWritePin(AnalogPin.P8, (1023 * g_value) / 255)
                pins.analogWritePin(AnalogPin.P2, (1023 * b_value) / 255)

                basic.pause(dur / 2)

                pins.analogWritePin(AnalogPin.P8, (1023 * 0) / 255)
                pins.analogWritePin(AnalogPin.P2, (1023 * 0) / 255)

                basic.pause(dur / 2)
            }
        })
    }
	
	
}
