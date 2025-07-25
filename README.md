# Contacts-CRUD-Operation
Perfect. SUSH wants *real* — so you’ll get *real*. Let’s do this **CRUD Contact Manager** — full MERN, zero sugar, step by step, all the way from `npx create-react-app` to **“Hey Mom, here’s my deployed app!”**.

---

## ⚡️ **Project: CRUD Contact Manager — Full MERN**

---

## 📂 **PHASE 1 — Setup**

---

### ✅ **1️⃣ Create Folders**

**Recommended structure:**

```
/mern-contact-manager
  ├── /client  (React frontend)
  ├── /server  (Node/Express backend)
```

---

### ✅ **2️⃣ Init Backend**

```bash
mkdir server
cd server
npm init -y
npm install express mongoose cors dotenv
npm install nodemon --save-dev
```

Add **scripts** to `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Create `index.js`:

```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

Create `.env`:

```
MONGO_URI=<Your MongoDB Atlas connection string>
```

---

### ✅ **3️⃣ Create Contact Model**

`server/models/Contact.js`:

```js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);
```

---

### ✅ **4️⃣ Create CRUD Routes**

`server/routes/contacts.js`:

```js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create Contact
router.post('/', async (req, res) => {
  const newContact = new Contact(req.body);
  const saved = await newContact.save();
  res.json(saved);
});

// Get All Contacts
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Update Contact
router.put('/:id', async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete Contact
router.delete('/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
```

Plug it in `index.js`:

```js
const contactsRoute = require('./routes/contacts');
app.use('/api/contacts', contactsRoute);
```

---

✅ ✅ ✅ At this point, you have a **running REST API**.

Run it:

```bash
npm run dev
```

Test with Postman or Thunder Client:

* `POST http://localhost:5000/api/contacts`
* `GET http://localhost:5000/api/contacts`
* etc.

---

## 📂 **PHASE 2 — React Frontend**

---

### ✅ **1️⃣ Create React App**

```bash
cd ..
npx create-react-app client
cd client
npm install axios
```

---

### ✅ **2️⃣ Create Components**

Simple structure:

```
/client/src
  ├── App.js
  ├── components/
         ├── ContactForm.js
         ├── ContactList.js
```

---

### ✅ **3️⃣ App.js**

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/contacts'; // change to deployed URL later

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await axios.get(API);
    setContacts(res.data);
  };

  const addContact = async () => {
    await axios.post(API, form);
    fetchContacts();
    setForm({ name: '', email: '', phone: '' });
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchContacts();
  };

  return (
    <div>
      <h1>Contact Manager</h1>

      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <button onClick={addContact}>Add</button>

      <ul>
        {contacts.map(c => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
            <button onClick={() => deleteContact(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

## ✅ **4️⃣ Run Frontend**

```bash
npm start
```

Open `http://localhost:3000` — Add a contact, delete, refresh — boom.

---

## 📂 **PHASE 3 — DEPLOY**

---

### ✅ **1️⃣ Deploy Backend**

* Push `/server` to GitHub.
* Use **Render** or **Railway** to deploy Node/Express.

  * Add `MONGO_URI` env var.
  * Expose port `5000`.

---

### ✅ **2️⃣ Deploy Frontend**

* Push `/client` to GitHub.
* Use **Vercel**.
* In `App.js`, change `API` to your live backend URL.
* Redeploy.

---

### ✅ **3️⃣ CORS**

In `server/index.js`:

```js
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app'
}));
```

---

## 🔥 **DONE**

Now you’ve built, tested, and shipped a **real MERN CRUD** app, not just a half-baked tutorial.

---

If you want, I can:

* Give you a **GitHub repo template**
* Help you write a **`.env.example`**
* Show you how to do **Edit Contact** with forms.

**Want the next steps or should I prep a zip file for you?**
