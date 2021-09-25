use hospital;
Create Table Ward(
	WardId int primary key AUTO_INCREMENT,
    WardName varchar(200)  Not Null
);

Create Table Rooms(
  RoomNo int Primary Key AUTO_INCREMENT,
  RoomType varchar(400) not null,
  WardId int not null,
  constraint FK_WardId
  foreign key (WardId) references Ward (WardId)
);

Create Table Staff(
  StaffNo int Primary Key AUTO_INCREMENT,
  FirstName varchar(400) not null,
  LastName varchar(400) not null,
  DOB date,
  adhar varchar(200) unique,
  emailid varchar(200) ,
  Designation varchar(300) not null
);


Create Table Doctor(
  DoctorId int Primary Key AUTO_INCREMENT,
  Specialization varchar(400) not null,
  Experience int not null,
  StaffNo int not null,
  constraint FK_StaffNo
  foreign key (StaffNo) references Staff (StaffNo)
);

Create Table Nurse(
  NurseId int Primary Key AUTO_INCREMENT,
  StaffNo int not null,
  WardNo int not null,
  constraint FK_StaffId
  foreign key (StaffNo) references Staff (StaffNo),
  constraint FK_WardNo
  foreign key (WardNo) references Ward (WardId)
);

Create Table WardBoy(
  WardBoyId int Primary Key AUTO_INCREMENT,
  StaffNo int not null,
  WardNo int not null,
  constraint FK_WardBoyStaffId
  foreign key (StaffNo) references Staff (StaffNo),
  constraint FK_WardBoyWardNo
  foreign key (WardNo) references Ward (WardId)
);

Create Table Patient(
  PatientId int Primary Key AUTO_INCREMENT,
  PatientName varchar(400) not null,
  Age int not null,
  adhar varchar(200) unique,
  email varchar(200),
  Disease varchar(400) not null,
  WardNo int not null,
  DoctorId int not null,
  constraint FK_patientWardId
  foreign key (WardNo) references Ward (WardId),
  constraint FK_patientDoctorId
  foreign key (DoctorId) references Doctor (DoctorId)
);

create table users(
	username varchar(200) primary key,
    password varchar(200),
    role varchar(200)
);
insert into users values("Hardik","Hardik","Admin");
insert into staff(FirstName, LastName , DOB ,adhar ,emailid, Designation) values("Hardik","Goswami","15/07/1999","12345678","hardik.goswami@blazeclan.com","Dctor");