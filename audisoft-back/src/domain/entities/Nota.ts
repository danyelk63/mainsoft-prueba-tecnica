export class Grade {
  id?: number;
  name: string;
  teacherId: number;
  studentId: number;
  value: number;

  constructor(
    name: string,
    teacherId: number,
    studentId: number,
    value: number,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.studentId = studentId;
    this.value = value;
  }
}
