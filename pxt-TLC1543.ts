// 在此处添加您的代码
/**
 * Microbit_V1.1 扩展板 模拟量读取。
 */
/**
 * 自定义图形块
 */
//% weight=5 color=#ff4500 icon="\uf113" block="TLC1543"
namespace TLC1543 {
    /**
	 * 循迹数值读取，基于TLC1543引脚扩展芯片，返回 A0-A7  8个通道的模拟量
	*/
    //% block="AnalogRead" group="模拟量"
    export function AnalogRead(): number[] {
        let i = 0;
        let j = 0;
        let channel = 0;
        let values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let sensor_values = [0, 0, 0, 0, 0, 0, 0, 0];
        pins.digitalWritePin(DigitalPin.P16, 0);
        basic.pause(2);
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 10; j++) {
                //0 to 4 clock transfer channel address
                if (j < 4) {
                    if ((i >> (3 - j)) & 0x01) {
                        pins.digitalWritePin(DigitalPin.P15, 1);
                    } else {
                        pins.digitalWritePin(DigitalPin.P15, 0);
                    }
                }
                //0 to 10 clock receives the previous conversion result
                values[i] <<= 1;
                if (pins.digitalReadPin(DigitalPin.P14)) {
                    values[i] |= 0x01;
                }
                pins.digitalWritePin(DigitalPin.P13, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
            }
        }
        pins.digitalWritePin(DigitalPin.P16, 1);
        for (i = 0; i < 8; i++) {
            sensor_values[i] = values[i + 1];
        }
        return sensor_values;
    }
} 