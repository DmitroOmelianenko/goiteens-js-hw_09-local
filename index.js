const form = document.getElementById('contactForm');
const contactsDiv = document.getElementById('contacts');

const getContacts = () => JSON.parse(localStorage.getItem('contacts')) || [];
const setContacts = (contacts) => localStorage.setItem('contacts', JSON.stringify(contacts));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let contacts = getContacts();
    contacts.push({
        name: form.name.value,
        surname: form.surname.value,
        phone: form.phone.value,
        email: form.email.value
    });
    setContacts(contacts);
    form.reset();
    loadContacts();
});

const loadContacts = () => {
    contactsDiv.innerHTML = getContacts().map((c, i) => `
        <div class="contact">
            <p>${c.name} ${c.surname}</p>
            <p>${c.phone}</p>
            <p>${c.email}</p>
            <button onclick="deleteContact(${i})">Видалити</button>
        </div>
    `).join('');
};

const deleteContact = (index) => {
    let contacts = getContacts();
    contacts.splice(index, 1);
    setContacts(contacts);
    loadContacts();
};

window.onload = loadContacts;