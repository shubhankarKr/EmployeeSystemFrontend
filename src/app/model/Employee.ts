export class Employee {
	id!: number
	firstName!: string;
	lastName!: string;
	 street!: string;
	 city!: string;
	 pinCode!: number;
	 gender!: string;
	 email!: string;
	 password!: string;
	 designation!: string
	skills!: { skillName: string }[]

	constructor(
		firstName: string, 
		lastName: string,
		street: string,
		city: string,
		pinCode: number,
		gender: string,
		email: string,
		designation: string) {
		this.firstName=firstName;
		this.lastName=lastName;
		this.street=street;
		this.city=city;
		this.pinCode=pinCode;
		this.gender=gender;
		this.email=email;
		this.designation=designation
	}
	
}