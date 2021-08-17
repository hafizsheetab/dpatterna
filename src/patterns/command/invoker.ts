import { SvelteComponent } from "svelte";

interface Icommand {
    execute(): void
    unexecute(): void
}

export class Light {
    private readonly light: SvelteComponent
    get_light(): SvelteComponent {
        return this.light
    }
    constructor(light : SvelteComponent) {
        this.light = light;
    }
    private redNo = 0;
    private isRed = false;
    private isOn = true;
    public turnOn():void {
        this.light.src = `./images/light-receiver/on.png`
        this.isOn = true
        this.isRed = false
    }
    public turnOff():void {
        this.isOn = false;
        this.light.src = `./images/light-receiver/off.png`
    }
    public makeRed(): void{
        if(this.isOn){
             this.isRed = true;
             this.switchRedLight();
             console.log('default' + this.redNo)
        }
    }
    public increaseRedNo(): void{
        if(this.redNo < 3){
            this.redNo += 1
            this.switchRedLight()
            console.log('increase' + this.redNo)
        }

    }
    public decreaseRedNo(): void{
        if(this.redNo > 0){
            this.redNo -= 1
            this.switchRedLight()
            console.log('decrease' + this.redNo)
        }
    }
    public switchRedLight(): void{
        if(this.isRed && this.isOn){
            this.light.src = `./images/light-receiver/red/${this.redNo}.png`;
            console.log('switch' + this.redNo)
        }
    }
}

class PowerCommand implements Icommand {
    private light: Light
    constructor(light : Light) {
        this.light = light;
    }
    execute(): void {
        this.light.turnOn()
    }
    unexecute(): void {
        this.light.turnOff()
    }
}
class RedCommand implements Icommand {
    private light: Light
    constructor(light : Light) {
        this.light = light;
    }
    execute(): void {
        this.light.makeRed()
    }
    unexecute(): void {
        this.light.turnOn()
    }
}

class RedIntensifyCommand implements Icommand {
    private light: Light
    constructor(light : Light) {
        this.light = light;
    }
    execute(): void {
        this.light.increaseRedNo()
    }
    unexecute(): void {
        this.light.decreaseRedNo()
    }
}

export class Invoker {
    powerCommand: PowerCommand;
    redCommand: RedCommand;
    redIntensifyCommand: RedIntensifyCommand;
    constructor(lightComponent: SvelteComponent){
        const light = new Light(lightComponent)
        this.powerCommand = new PowerCommand(light)
        this.redCommand = new RedCommand(light)
        this.redIntensifyCommand = new RedIntensifyCommand(light)
    }
    executeCommand(command: string){
        console.log(command)
        switch(command){
            case "power":
                this.powerCommand.execute()
                break
            case "red":
                this.redCommand.execute()
            case "redIntensify":
                this.redIntensifyCommand.execute()
        }
    }
    unexecuteCommand(command: string){
        console.log(command)
        switch(command){
            case "power":
                this.powerCommand.unexecute()
                break
            case "red":
                this.redCommand.unexecute()
            case "redIntensify":
                this.redIntensifyCommand.unexecute()
        }
    }
}