export interface User {
	username: string;
	avatar_url?: string;
	bio?: string;
}

export interface TeamMember {
	user: User;
	role: String;
}
