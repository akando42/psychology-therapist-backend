import { ProviderType } from "../enums/provider-type.enum";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Provider {

	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(type => ProviderExperience, experience => experience.provider)
	experiences: ProviderExperience[];

	@Column()
	type: number;

	@Column()
	enable: boolean;

}

@Entity()
export class ProviderExperience {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Provider, provider => provider.experiences)
	provider: Provider
}