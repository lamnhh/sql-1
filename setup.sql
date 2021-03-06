create database SQL_1
go
use SQL_1

go
create table NV (
	MSNV char(6) check (MSNV not like '%[^0-9]%'),
	HT nvarchar(30),
	GT int check (GT = 0 or GT = 1), -- 0: female; 1: male
	MSPB int not null,
	primary key (MSNV)
)

create table PB (
	MSPB int,
	TENPB nvarchar(30),
	primary key (MSPB)
)

go
alter table NV
	add constraint FK_NV_PB
	foreign key (MSPB) references PB(MSPB)
	
go
insert into PB
values
	(1, N'Phòng ban 1'),
	(2, N'Phòng ban 2'),
	(3, N'Phòng ban 3'),
	(4, N'Phòng ban 4')
insert into NV
values
	('000001', N'Nguyễn Văn 1', 1, 1),
	('000002', N'Nguyễn Thị 2', 0, 1),
	('000003', N'Nguyễn Thị 3', 0, 3),
	('000004', N'Trần Thị 2', 0, 2),
	('000005', N'Nguyễn Thị 2', 0, 4),
	('000006', N'Lý Văn 2', 1, 1)