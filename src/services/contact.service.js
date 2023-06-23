export const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
}

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    var contactsToReturn = contacts
    if (filterBy && filterBy.name) {
      contactsToReturn = filter(filterBy.name)
    }
    resolve(sort(contactsToReturn))
  })
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    const contact = contacts.find((contact) => contact._id === id)
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
  })
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex((contact) => contact._id === id)
    if (index !== -1) {
      contacts.splice(index, 1)
    }
    resolve(contacts)
  })
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
  }
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex((c) => contact._id === c._id)
    if (index !== -1) {
      contacts[index] = contact
    }
    resolve(contact)
  })
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    contact._id = _makeId()
    contacts.unshift(contact)
    resolve(contact)
  })
}

function filter(term) {
  term = term.toLocaleLowerCase()
  return contacts.filter((contact) => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    )
  })
}

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1
    }

    return 0
  })
}

function _makeId(length = 10) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

const contacts = [
  {
    _id: '5a56640269f443a5d64b32ca',
    name: 'Jimmy Oliver',
    email: 'jimmyOliver@renovize.com',
    phone: '+1 (968) 593-3824',
    balance: 2,
  },
  {
    _id: '5a5664025f6ae9aa24a99fde',
    name: 'Alex Turner',
    email: 'alexTurner@renovize.com',
    phone: '+1 (948) 464-2888',
    balance: 1.36,
  },
  {
    _id: '5a56640252d6acddd183d319',
    name: 'Toni Snake',
    email: 'toniSnake@renovize.com',
    phone: '+1 (958) 502-3495',
    balance: 3,
  },
  {
    _id: '5a566402ed1cf349f0b47b4d',
    name: 'Shimshon Yossef',
    email: 'shimshonY@renovize.com',
    phone: '+1 (911) 475-2312',
    balance: 0.34,
  },
  {
    _id: '5a566402abce24c6bfe4699d',
    name: 'Dom Toretto',
    email: 'domT@renovize.com',
    phone: '+1 (807) 551-3258',
  },
  {
    _id: '5a566402a6499c1d4da9220a',
    name: 'Tony Soprano',
    email: 'tonyS@renovize.com',
    phone: '+1 (970) 527-3082',
    balance: 1.38,
  },
  {
    _id: '5a566402f90ae30e97f990db',
    name: 'John Wick',
    email: 'johnW@renovize.com',
    phone: '+1 (952) 501-2678',
    balance: 0.86,
  },
  {
    _id: '5a5664027bae84ef280ffbdf',
    name: 'Dwayne Johnson',
    email: 'daROCK@renovize.com',
    phone: '+1 (989) 503-2663',
    balance: 1.89,
  },
  {
    _id: '5a566402e3b846c5f6aec652',
    name: 'John Snow',
    email: 'johnS@renovize.com',
    phone: '+1 (968) 454-3851',
    balance: 0.27,
  },
  {
    _id: '5a56640272c7dcdf59c3d411',
    name: 'Gal Gadot',
    email: 'GalG@renovize.com',
    phone: '+1 (986) 545-2166',
    balance: 3.34,
  },
]
