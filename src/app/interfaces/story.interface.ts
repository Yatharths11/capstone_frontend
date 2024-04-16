// Define an interface representing the Story document
export interface Story {
    prompt: string; // Assuming prompt is stored as ObjectId reference
    currentContributor: string; // Assuming currentContributor is stored as ObjectId reference
    content: ContentItem[]; // Array of content items
    createdAt: Date;
    isPrivate: boolean;
    contributors: string[]; // Array of contributor ObjectIds
  }
  
// Define an interface representing a content item within the Story document
export interface ContentItem {
  text: string;
  contributor: string; // Assuming contributor is stored as ObjectId reference
  date: Date;
  upvotes?: number; // Optional field
  downvotes?: number; // Optional field
}
  