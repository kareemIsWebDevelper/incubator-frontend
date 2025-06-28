export type UserRole = 'Admin' | 'Startup' | 'Mentor' | 'OrgManager' | 'User' | 'Editor' | 'Not Verified';
export type Gender = 'Male' | 'Female' | 'Other';

export type UserType = {
  id: number;
  name: string;
  firstname?: string;
  lastname?: string;
  email: string;
  phone: string;
  gender: Gender;
  role: UserRole;
  hasCompany: boolean;
  image: string | null;
  created_at: string;
}