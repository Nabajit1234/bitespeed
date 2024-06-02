import { Op } from "sequelize";
import { Contact } from "../schemas/contact.schema";
import { ContactCreationType, SaveContactPayload } from "../types/contact.type";
import { ApiResponse, SuccessResponse } from "../types/response.type";

export async function saveContact(contact: SaveContactPayload): Promise<ApiResponse> {
  if(!contact.phoneNumber && !contact.email) {
    return {
      statusCode: 400,
      data: {
        message: "please provide either phone number or email"
      }
    }
  }

  try {
    let contacts = await Contact.findAll({
      where: {
        [Op.or]: [
          {email: contact.email},
          {phoneNumber: contact.phoneNumber}
        ]
      },
      order: [['createdAt', 'ASC']]
    })

    if(contacts.length === 0) {
      const newContact: ContactCreationType = {
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        linkedId: null,
        linkPrecedence: "primary"
      }
      const createContactResponse = await Contact.create(newContact)
      return {
        statusCode: 200,
        data: {
          contact: {
            primaryContactId: createContactResponse.id,
            emails: [createContactResponse.email],
            phoneNumbers: [createContactResponse.phoneNumber],
            secondaryContactIds: []
          }
        }
      }
    }

    const primary = contacts.find((contactData) => {
      return contactData.linkPrecedence === "primary"
    })

    if(!primary) {
      const oldestContact = contacts[0]
      oldestContact.linkPrecedence = "primary"
      await Contact.update(oldestContact, {
        where: {
          id: oldestContact.id
        }
      })
    }

    const contactExists = contacts.find((contactData) => {
      return contactData.email === contact.email && contactData.phoneNumber === contact.phoneNumber
    })

    if(!contactExists) {
      const createContact = await Contact.create({
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        linkedId: primary ? primary.id : contacts[0].id,
        linkPrecedence: "secondary"
      })
      contacts.push(createContact)
    }

    const response: SuccessResponse = {
      statusCode: 200,
      data: {
        contact: {
          primaryContactId: primary ? primary.id : contacts[0].id,
          emails: [],
          phoneNumbers: [],
          secondaryContactIds: []
        }
      }
    }

    contacts.forEach((contact) => {
      if(contact.email && !response.data.contact.emails.includes(contact.email)) {
        response.data.contact.emails.push(contact.email)
      }
      if(contact.phoneNumber && !response.data.contact.phoneNumbers.includes(contact.phoneNumber)) {
        response.data.contact.phoneNumbers.push(contact.phoneNumber)
      }
      if(contact.linkPrecedence !== "primary" && !response.data.contact.secondaryContactIds.includes(contact.id)) {
        response.data.contact.secondaryContactIds.push(contact.id )
      }

    })

    return response
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      data: {
        message: "internal server error"
      }
    }
  }
}