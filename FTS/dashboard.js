// Import the required functions from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAfx48Ge0UGyJDpVzMI02OuhYUyqFAd-A",
    authDomain: "fts-project-2350a.firebaseapp.com",
    projectId: "fts-project-2350a",
    storageBucket: "fts-project-2350a.appspot.com",
    messagingSenderId: "814785421417",
    appId: "1:814785421417:web:35a0e04db23fe9352582f8",
    measurementId: "G-XR70MMNGK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Log expense function with additional logging for debugging
window.logExpense = async () => {
    const user = auth.currentUser;
    if (user) {
        const amount = document.getElementById('expense-amount').value;
        const description = document.getElementById('expense-description').value;
        const date = document.getElementById('expense-date').value;

        console.log('Logging expense:', { amount, description, date });

        try {
            await addDoc(collection(db, "expenses"), {
                userId: user.uid,
                amount: parseFloat(amount),
                description: description,
                date: date
            });

            alert('Expense logged successfully!');
            console.log('Expense logged successfully.');
            // Update chart or UI as needed
            loadExpenses();
        } catch (error) {
            console.error('Error logging expense:', error);
            alert('Error logging expense: ' + error.message);
        }
    } else {
        alert('No user is signed in.');
        console.log('No user is signed in.');
    }
};

// Load expenses and update chart
const loadExpenses = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const querySnapshot = await getDocs(collection(db, "expenses"));
            const expenses = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.userId === user.uid) {
                    expenses.push(data);
                }
            });

            console.log('Loaded expenses:', expenses);

            // Update chart with expenses
            updateChart(expenses);
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    } else {
        console.log('No user is signed in.');
    }
};

// Update chart with expenses
const updateChart = (expenses) => {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: expenses.map(expense => expense.date),
            datasets: [{
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Set reminder function with logging
window.setReminder = async () => {
    const user = auth.currentUser;
    if (user) {
        const description = document.getElementById('reminder-description').value;
        const date = document.getElementById('reminder-date').value;

        console.log('Setting reminder:', { description, date });

        try {
            await addDoc(collection(db, "reminders"), {
                userId: user.uid,
                description: description,
                date: date
            });

            alert('Reminder set successfully!');
            console.log('Reminder set successfully.');
        } catch (error) {
            console.error('Error setting reminder:', error);
            alert('Error setting reminder: ' + error.message);
        }
    } else {
        alert('No user is signed in.');
        console.log('No user is signed in.');
    }
};

// Set goal function with logging
window.setGoal = async () => {
    const user = auth.currentUser;
    if (user) {
        const description = document.getElementById('goal-description').value;
        const amount = document.getElementById('goal-amount').value;
        const deadline = document.getElementById('goal-deadline').value;

        console.log('Setting goal:', { description, amount, deadline });

        try {
            await addDoc(collection(db, "goals"), {
                userId: user.uid,
                description: description,
                amount: parseFloat(amount),
                deadline: deadline
            });

            alert('Goal set successfully!');
            console.log('Goal set successfully.');
        } catch (error) {
            console.error('Error setting goal:', error);
            alert('Error setting goal: ' + error.message);
        }
    } else {
        alert('No user is signed in.');
        console.log('No user is signed in.');
    }
};

// Load expenses when the page loads
document.addEventListener('DOMContentLoaded', loadExpenses);
