export type Item = { name: string; href: string; external?: boolean };
export type File = {
	name: string;
	type: string;
	icon: string;
	modified: string;
	size?: string;
};
export type Contributor = {
	login: string;
	avatar_url: string;
	contributions: number;
};
export type ButtonType = "primary" | "secondary";