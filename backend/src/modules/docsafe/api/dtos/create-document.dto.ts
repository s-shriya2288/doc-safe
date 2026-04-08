import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  category_id?: string;

  @IsDateString()
  @IsOptional()
  issue_date?: string;

  @IsDateString()
  @IsOptional()
  expiry_date?: string;
}
