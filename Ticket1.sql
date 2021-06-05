create database Ticket1

use Ticket1

create table resumenFinanciero (
	id_resumenF int identity(1,1) not null,
	ventas float not null,
	costos float not null,
	primary key (id_resumenF)

)

create table flujoEfectivo (
	id_flujoE  int identity (1,1) not null,
	ingresos float not null,
	egresos float not null,
	primary key (id_flujoE)
)

create table usuario (
	id_usuario int identity (1,1) not null,
	nombres varchar (50) not null,
	apellidos varchar (50) not null,
	usuario varchar (30) not null,
	pass varchar (30) not null,
	cpass varchar (30) not null,
	primary key (id_usuario)
)

create table presupuesto (
	id_presupuesto int IDENTITY(1,1) not null,
	fecha_presupuesto date, 
	proyecto_presupuesto varchar (50),
	version_presupuesto varchar (50),
	id_resumenF int not null,
	id_flujoE int not null,
	foreign key (id_resumenF) references resumenFinanciero (id_resumenF),
	foreign key (id_flujoE) references flujoEfectivo (id_flujoE),
	primary key (id_presupuesto)
)