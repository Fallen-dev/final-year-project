

export default class Slot{
    subject = "";
    constructor(start_time, slot_time, slot_number){
        this.start_time = start_time;
        this.slot_time = slot_time;
        this.slot_number = slot_number;
    }
    setProfandSub(subject, professor){
        this.subject = subject;
        this.professor = professor;
    }
}