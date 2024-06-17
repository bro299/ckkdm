const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.search = functions.https.onRequest(async (req, res) => {
    const term = req.query.term.toLowerCase();

    try {
        const khodamsRef = await db.collection('khodams').where('name', '==', term).get();
        const results = [];
        khodamsRef.forEach(doc => {
            results.push(doc.data());
        });
        res.json(results);
    } catch (error) {
        console.error('Error searching khodam:', error);
        res.status(500).json({ error: 'Gagal mencari khodam.' });
    }
});
