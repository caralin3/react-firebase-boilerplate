import { db } from './firebase';

// User API

// Asynchronous function creates user as an object
// stored on the users/${id} resource path
export const doCreateUser = (id: string, username: string, email: string) => 
  db.ref(`users/${id}`).set({username, email});

// Asynchronous function retrieves users from the general user's 
// entity resource path
// returns all users from the Firebas realtime database
export const onceGetUsers = () => db.ref('users').once('value');