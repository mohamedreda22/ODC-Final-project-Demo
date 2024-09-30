export interface Article {
  _id: number;         // Unique identifier for the article
  title: string;       // Title of the article
  imgSrc: string;      // Source URL of the article image
  altText: string;     // Alternative text for the article image
  content: string;     // Main content of the article
  date: string;        // Publication date (ISO format)
  category: string;    // Category to which the article belongs
}
