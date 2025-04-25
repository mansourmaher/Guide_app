export interface Certification {
    name: string;
    organisation: string;
    date: string;
    description?: string;
  }
  
  export interface Post {
    title: string;
    content: string;
    images?: string[];
    createdAt: Date;
  }
  
  export interface PreferredGuest {
    name: string;
    description?: string;
    icon?: string;
  }

  export interface PersonelInformationType{
    _id:string;
    name:string;
    nikname:string | undefined;
    email:string;
    phoneNumber:string | undefined;
    location:string | undefined;
    about:string | undefined;
    spokenLanguages:string[] | undefined;
  }
  export interface PreferredGuestSchema{
    name: string;
    description?: string;
    icon?: string;
  }
  export interface CertificationSchema{
    name: string;
    organisation: string;
    date: string;
    description?: string;
  }

  export interface ExpertiseInformationSchemas{
    expertise: string[];
    certifications: CertificationSchema[];
    guestPreferences: PreferredGuestSchema[];
  }

  
  export interface UserModelType {
    // Common
    _id?: string;
    email: string;
    fullName: string;
    password: string;
    phoneNumber?: string;
    verificationCode?: string;
    isVerified: boolean;
    profileImage?: string;
    gender?: string;
    FCMToken?: string[];
    stripeCustomerId?: string;
    role: 'TOURIST' | 'GUIDE' | 'ADMIN'; // adjust based on your ROLE const
    dateOfBirth?: Date;
    nationality?: string;
    location?: string;
    about?: string;
    spokenLanguages?: string[];
  
    // Tourist
    passportNumber?: string;
    preferences?: string[];
    wishlist?: string[];
  
    // Guide
    profile?: string;
    nickname?: string;
    cin?: number;
    experiences?: string[];
    languages?: string[];
    certifications?: Certification[];
    preferredGuests?: PreferredGuest[];
    posts?: Post[];
    rating?: number;
  
    // Timestamps
    createdAt?: Date;
    updatedAt?: Date;
  }
  