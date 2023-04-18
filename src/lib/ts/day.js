import Slot from "./newSlot.js";

export default class Day{
    slots = [];
    constructor(day_name){
        this.day_name = day_name;
    }
    addSlots(slot){
        this.slots.push(slot);
    }

}