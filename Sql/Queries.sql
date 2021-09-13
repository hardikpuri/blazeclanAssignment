use healthcare;
Create Table Ward(
	WardId int Primary Key,
    WardName varchar(200)  Not Null
);

Create Table Rooms(
  RoomNo int Primary Key,
  RoomType varchar(400) not null,
  WardId int not null,
  constraint FK_WardId
  foreign key (WardId) references Ward (WardId)
);

Create Table Staff(
  StaffNo int Primary Key,
  StaffName varchar(400) not null,
  Designation varchar(300) not null
);
Create Table Doctor(
  DoctorId int Primary Key,
  Specialization varchar(400) not null,
  Experience int not null,
  StaffNo int not null,
  constraint FK_StaffNo
  foreign key (StaffNo) references Staff (StaffNo)
);
Create Table Nurse(
  NurseId int Primary Key,
  StaffNo int not null,
  WardNo int not null,
  constraint FK_StaffId
  foreign key (StaffNo) references Staff (StaffNo),
  constraint FK_WardNo
  foreign key (WardNo) references Ward (WardId)
);

Create Table WardBoy(
  WardBoyId int Primary Key,
  StaffNo int not null,
  WardNo int not null,
  constraint FK_WardBoyStaffId
  foreign key (StaffNo) references Staff (StaffNo),
  constraint FK_WardBoyWardNo
  foreign key (WardNo) references Ward (WardId)
);
Create Table Patient(
  PatientId int Primary Key,
  PatientName varchar(400) not null,
  Age int not null,
  Disease varchar(400) not null,
  WardNo int not null,
  DoctorId int not null,
  constraint FK_patientWardId
  foreign key (WardNo) references Ward (WardId),
  constraint FK_patientDoctorId
  foreign key (DoctorId) references Doctor (DoctorId)
);
Create Table Canteen(
  PatientId int Primary Key,
  TotalAmountDue int not null,
  AmountPaid int not null,
  TotalBill int not null,
  constraint FK_PatientCanteenBill
  foreign key (PatientId) references Patient (PatientId)
);