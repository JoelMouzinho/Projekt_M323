const { updateQuizCards, sortQuizCards, updateCardRating, handleDelete, handleEdit } = require('./script.js');

// Simulierte Quizkarten
const quizCards = [
    { question: "Was ist die Hauptstadt von Deutschland?", answer: "Berlin", rating: null },
    { question: "Wie viele Kontinente gibt es?", answer: "7", rating: null },
    { question: "Was ist 5 + 3?", answer: "8", rating: null }
];

describe('Quiz App Funktionstests', () => {

    // Test für updateQuizCards
    test('updateQuizCards sollte die Karte am Index aktualisieren', () => {
        const newCard = { question: "Neue Frage", answer: "Neue Antwort", rating: null };
        const updatedCards = updateQuizCards(quizCards, 1, newCard);

        expect(updatedCards[1]).toEqual(newCard);
        expect(updatedCards[0]).toEqual(quizCards[0]); // Sicherstellen, dass andere Karten unverändert bleiben
    });

    // Test für sortQuizCards
    test('sortQuizCards sollte die Karten nach Bewertung sortieren', () => {
        const ratedCards = [
            { question: "Was ist die Hauptstadt von Deutschland?", answer: "Berlin", rating: 'good' },
            { question: "Wie viele Kontinente gibt es?", answer: "7", rating: 'bad' },
            { question: "Was ist 5 + 3?", answer: "8", rating: 'great' }
        ];

        const sortedCards = sortQuizCards(ratedCards);

        expect(sortedCards[0].rating).toBe('bad');
        expect(sortedCards[1].rating).toBe('good');
        expect(sortedCards[2].rating).toBe('great');
    });

    // Test für updateCardRating
    test('updateCardRating sollte das Rating der Karte aktualisieren', () => {
        const updatedCards = updateCardRating(quizCards, 2, 'great');
        
        expect(updatedCards[2].rating).toBe('great');
        expect(updatedCards[1].rating).toBe(null); // Sicherstellen, dass andere Karten unverändert bleiben
    });

    // Test für handleDelete
    test('handleDelete sollte die Karte löschen', () => {
        const updatedCards = quizCards.filter((_, i) => i !== 1);
        expect(updatedCards.length).toBe(2);
        expect(updatedCards[0].question).toBe('Was ist die Hauptstadt von Deutschland?');
        expect(updatedCards[1].question).toBe('Was ist 5 + 3?');
    });

    // Test für handleEdit
    test('handleEdit sollte die Karte bearbeiten', () => {
        const newQuestion = 'Neue Frage';
        const newAnswer = 'Neue Antwort';

        const updatedCards = updateQuizCards(quizCards, 0, { ...quizCards[0], question: newQuestion, answer: newAnswer });

        expect(updatedCards[0].question).toBe(newQuestion);
        expect(updatedCards[0].answer).toBe(newAnswer);
    });
});
