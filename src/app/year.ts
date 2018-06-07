export class Year {
    name: string;
    slots: Slot[];
    creditsPlanned: number;
    upcoming: Boolean;

    checkCredits = function() {        
        for (let i = this.slots ? this.slots.length : 0; i < 8; i++) {
            this.slots.push(new Slot());
        }
        let self = this;
        this.creditsPlanned = 0;
        this.slots.forEach(function(slot) {
            if (slot.course) {
                self.creditsPlanned += slot.course.credits;
            }
        });
    }

    constructor(name: string, slots?: Slot[]) {
        this.name = name;
        this.slots = slots ? slots : [];
        this.creditsPlanned = 0;
        this.upcoming = false;
        this.checkCredits();
    }
}

export class Slot {
    course: Course
    recommendation: Recommendation

    constructor(course?: Course, recommendation?: Recommendation) {
        this.course = course;
        this.recommendation = recommendation;
    }
}

export class Course {
    name: string;
    subject: string;
    courseCode: string;
    year: number;
    credits: number;
    prerequisites: Course[];

    constructor(name: string, subject: string, year: number, courseCode: string, credits: number, prerequisites?: Course[]) {
        this.name = name;
        this.subject = subject;
        this.year = year;
        this.courseCode = courseCode;
        this.credits = credits;
        this.prerequisites = prerequisites;
    }
}

export class Recommendation {
    course: Course;
    type: string;

    constructor(type: string, course?: Course) {
        this.type = type;
        this.course = course;
        if (this.course) {
            this.type = "course";
        }
    }
}