export interface MarketingPhoto {
  id: string;
  uploaded_by: string | null;
  uploaded_by_email: string | null;
  file_name: string;
  storage_path: string;
  url: string;
  size: number | null;
  content_type: string | null;
  created_at: string;
}
