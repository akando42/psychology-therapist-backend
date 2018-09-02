import { ProviderType } from "../enums/provider-type.enum";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Provider {

	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(type => ProviderExperience, experience => experience.provider)
	experiences: ProviderExperience[];

	@OneToMany(type => ProviderFile, file => file.provider)
	files: ProviderFile[];

	@Column()
	type: number;

	@Column()
	enable: boolean;

}

@Entity()
export class ProviderExperience {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column('datetime')
	startDate: Date;

	@Column('datetime')
	endDate: Date;

	@ManyToOne(type => Provider, provider => provider.experiences)
	provider: Provider
}

@Entity()
export class ProviderFile {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: string;

	@Column('datetime')
	uploadDate: Date;

	@Column('blob')
	data: Buffer;

	@ManyToOne(type => Provider, provider => provider.files)
	provider: Provider

}