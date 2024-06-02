export interface SuccessResponse {
  statusCode: number,
  data: {
    contact: {
      primaryContactId: number,
      emails: any[],
      phoneNumbers: any[],
      secondaryContactIds: any[]
    }
  }
}

export interface ErrorResponse {
  statusCode: number,
  data: {
    message: string
  }
}

export type ApiResponse = SuccessResponse | ErrorResponse 