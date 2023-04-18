import Subject from "./newSub.js";
import Slot from "./newSlot.js";
import Day from "./day.js";
import fs from "fs/promises"

const subject_list = ['pr', 'dbms', 'rm', 'cn', 'ip', 'ddbms', 'nm', 'hr'];
const teachers_list = ['MI', 'SNC', 'PG', 'A.K.K', 'LT', 'SD', 'DB', 'JHUMA'];
const sub_list = [];
const lab_sub_list = [];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const start_hour = 10;
const end_Hour = 17;
const week = [];
const lec_hr1 = [];
const lec_hr2 = [];
const empty_slots = [];
const empty_slot_time = [];
const lab_slots = [];

const lab_sub = ['dbms-lab', 'cn-lab'];
const lab_teachers = ['SNC', 'A.K.K'];
//Creating Subjects
for (let x = 0; x < subject_list.length; x++) {
    let n_sub = new Subject(subject_list[x], teachers_list[x], 3);
    sub_list.push(n_sub);
}

for (let x = 0; x < lab_sub.length; x++) {
    let n_sub = new Subject(lab_sub[x], lab_teachers[x], 3);
    lab_sub_list.push(n_sub);
}
let slot_number = 1, slot_time = 0;
//console.log(sub_list);

/*Creating Slots*/
days.forEach(element => {
    let n_day = new Day(element);
    let break_p = 1;
    for (let i = start_hour; i <= end_Hour; i += slot_time) {
        slot_time = createSlots();
        if(i + slot_time <= 13){
            let new_slot = new Slot(i, slot_time, slot_number);
            n_day.addSlots(new_slot);
            slot_number += 1;
        }
        else if(i == 12){
            let new_slot = new Slot(i, 1, slot_number);
            n_day.addSlots(new_slot);
            slot_number += 1;
            slot_time = 1;
        }
        else if(i == 13 && break_p == 1){
            let new_slot = new Slot(i, 1, slot_number);
            slot_time = 1;
            new_slot.setProfandSub("Break");
            delete new_slot.professor;
            n_day.addSlots(new_slot);
            slot_number += 1;
            break_p = 0;
        }
        else{
            let new_slot = new Slot(i, slot_time, slot_number);
            n_day.addSlots(new_slot);
            slot_number += 1;
        }
    }
    week.push(n_day);
})
//console.log(week);

function createSlots() {
    let slot_time = Math.floor(Math.random() * (2) + 1);
    return slot_time;
}

week.forEach(element => {
    element.slots.forEach(x => {
        if (x.slot_time == 1)
            lec_hr1.push(x.slot_number);
        else
            lec_hr2.push(x.slot_number);
    })
})


//console.log(lec_hr1);
//console.log(lec_hr2);

for (let x = 0; x < sub_list.length; x++) {
    //Random assignment of 1 hour lecture
    let random_period = getRandomPeriod(lec_hr1.slice());
    week.forEach(element => {
        element.slots.forEach(i => {
            if (i.slot_number == random_period && i.subject == "") {
                i.setProfandSub(sub_list[x].sub_name, sub_list[x].teacher_assigned);
                lec_hr1.pop(random_period);
            }
        })
    })
    //Random assignment of 2 hour lecture
    let random_period2 = getRandomPeriod(lec_hr2.slice());
    //console.log(random_period2);
    week.forEach(element => {
        element.slots.forEach(i => {
            if (i.slot_number == random_period2 && i.subject == "") {
                i.setProfandSub(sub_list[x].sub_name, sub_list[x].teacher_assigned);
                lec_hr2.pop(random_period2);
                //console.log(i);
            }
        })
    })
}

function getRandomPeriod(lec_hr) {
    //console.log(lec_hr);
    let idx = Math.floor(Math.random() * lec_hr.length);
    return lec_hr[idx];
}

//console.log(week);

week.forEach(element => {
    console.log(element);
})
/*
week.forEach(element => {
    element.slots.forEach(x => {
        if (x.subject == "") {
            empty_slots.push(x.slot_number);
            empty_slot_time.push(x.slot_time);
        }
    })
})
let a = [];
let sum = empty_slot_time[0];
let temp = empty_slots[0];
a.push(temp);
for(let i = 1; i < empty_slots.length; i++){
    if(empty_slots[i] - temp == 1 && sum + empty_slot_time[i] <= 3){
        sum += empty_slot_time[i];
        a.push(empty_slots[i]);
        temp = empty_slots[i];
        console.log(a);
    }
    else if(sum == 3){
        lab_slots.push(a);
        console.log(a);
    }
    
    else if(sum + empty_slot_time[i] == 3){
        a.push(empty_slots[i])
        lab_slots.push(a);
        sum = empty_slot_time[i];
        console.log(a);
    }
    else{
        sum = empty_slot_time[i];
        a = [];
        a.push(empty_slots[i]);
        console.log(a);
    }
}
//console.log(lab_slots);



console.log(empty_slot_time);
console.log(empty_slots);
*/

/*
for(let i = 0; i < empty_slots.length - 2; i++){
    week.forEach(element => {
        let slots = element.slots;
        for(let v = 0; v < slots.length)
    })
}*/


export default function newSchedule() {
    return week
}

